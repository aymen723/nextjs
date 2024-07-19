import { Page } from "@/client/types/responses";
import {
  PharmacyRespData,
  ProductRespData,
} from "@/client/types/responses/StockResponses";
import { GeoCoordinates } from "@/types/geoTypes";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { Map } from "leaflet";
import React from "react";
import useLocatedPharmacies from "../hooks/useLocatedPharmacies";
import useSearchProducts from "@/util/hooks/api/useSearchProducts";
import { getGeolocation } from "@/util/lib/geolocation";
import { useAppSelector } from "@/util/hooks/redux";

type StockMapContextState = {
  pharmaciesPage: Page<PharmacyRespData> | undefined;
  isLoadingPharmacies: boolean;
  pharmaciesFilter: ReturnType<typeof useLocatedPharmacies>["filter"];
  map: Map | null;
  setMap: (map: Map) => void;
  isGeolocatingPosition: boolean;
  geolocate: () => Promise<GeoCoordinates>;
  isSelectingLocation: boolean;
  setIsSelectingLocation: (val: boolean) => void;
  filterProducts: ProductRespData[];
  isLoadingFilterProducts: boolean;
  userLocation: GeoCoordinates | undefined | null;
  setUserLocation: (location: GeoCoordinates | null) => void;
  range: number;
  clientAuthed: boolean;
};

const contextInitState: StockMapContextState = {
  isSelectingLocation: false,
  setIsSelectingLocation: () => {},
  isGeolocatingPosition: false,
  geolocate: () => Promise.reject(),
  isLoadingPharmacies: false,
  pharmaciesPage: undefined,
  pharmaciesFilter: {},
  filterProducts: [],
  isLoadingFilterProducts: false,
  map: null,
  setMap: () => {},
  userLocation: null,
  setUserLocation: () => {},
  range: 1000,
  clientAuthed: false,
};

const StockMapContext = React.createContext(contextInitState);

export const StockMapProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { searchParams, setSearchQueryValues } = useSearchQueryParams();
  const [map, setMap] = React.useState<StockMapContextState["map"]>(null);
  const [isSelectingLocation, setIsSelectingLocation] = React.useState(false);
  const role = useAppSelector((app) => app.auth.authData?.role);
  const clientAuthed = !!role && role === "CLIENT";

  const [isGeolocatingPosition, setIsGeolocatingPosition] =
    React.useState(false);
  //  const [userLocation  , setUserLocation] = React.useState<StockMapContextState["userLocation"]>(null)

  const { xLocation, yLocation, range } = React.useMemo(() => {
    return {
      xLocation: searchParams.get("x"),
      yLocation: searchParams.get("y"),
      range: Number.parseInt(searchParams.get("range") ?? "") || 1000,
    };
  }, [searchParams]);
  const products = React.useMemo(
    () => searchParams.getAll("products"),
    [searchParams]
  );

  const { productsPage, isProductsLoading: isFilterProductsLoading } =
    useSearchProducts(
      {
        pageSize: products.length,
        ids: products,
      },
      {
        queryKey: [],
        enabled: !!products.length,
      }
    );

  const filterProducts = React.useMemo(() => {
    return products.length ? productsPage?.content ?? [] : [];
  }, [products, productsPage]);

  const userLocation: StockMapContextState["userLocation"] =
    React.useMemo(() => {
      const x = Number.parseFloat(xLocation ?? "");
      const y = Number.parseFloat(yLocation ?? "");

      if (!x || !y) return null;

      return {
        x,
        y,
      };
    }, [xLocation, yLocation]);

  const setUserLocation = React.useCallback(
    (location: GeoCoordinates | null) => {
      setSearchQueryValues({
        x: location?.x,
        y: location?.y,
      });
    },
    [setSearchQueryValues]
  );

  const geolocate = React.useCallback(async () => {
    setIsGeolocatingPosition(true);
    return getGeolocation()
      .then((location) => {
        setUserLocation(location);
        return location;
      })
      .finally(() => {
        setIsGeolocatingPosition(false);
      });
  }, [setUserLocation]);

  const {
    pharmaciesPage,
    isLoading: isLoadingPharmacies,
    filter,
  } = useLocatedPharmacies(userLocation);

  const state: StockMapContextState = React.useMemo(
    () => ({
      isSelectingLocation,
      setIsSelectingLocation,
      isGeolocatingPosition,
      geolocate,
      isLoadingPharmacies,
      userLocation,
      map,
      setMap,
      pharmaciesPage: !!userLocation ? pharmaciesPage : undefined,
      pharmaciesFilter: filter,
      setUserLocation,
      filterProducts,
      isLoadingFilterProducts: isFilterProductsLoading,
      range,
      clientAuthed,
    }),
    [
      pharmaciesPage,
      userLocation,
      map,
      isSelectingLocation,
      setIsSelectingLocation,
      isGeolocatingPosition,
      isLoadingPharmacies,
      filter,
      setUserLocation,
      isFilterProductsLoading,
      filterProducts,
      geolocate,
      range,
      clientAuthed,
    ]
  );
  return (
    <StockMapContext.Provider value={state}>
      {children}
    </StockMapContext.Provider>
  );
};

export const useStockMap = () => {
  return React.useContext(StockMapContext);
};
