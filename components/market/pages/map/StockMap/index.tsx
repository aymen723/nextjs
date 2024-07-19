"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import { CircleDefiner, PharmacyMarker } from "@/components/MarkedMap";

import MarkedMapLoader from "@/components/MarkedMap/MarkedMapLoader";
import type { UserLocation } from "@/util/hooks/api/useSearchPharmacies";

import MapResultDetails from "./components/MapDetails";
import PharmacyStockDisplayer from "./components/PharmacyStockDisplayer";

import { getGeolocation } from "@/util/lib/geolocation";
import { useAppSelector } from "@/util/hooks/redux";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { GeoCoordinates } from "@/types/geoTypes";
import useLocatedPharmacies from "./hooks/useLocatedPharmacies";
import { getZoomByRange } from "./utils/getZoomByRange";
import { LeafletMouseEvent, Map } from "leaflet";
import MapDetails from "./components/MapDetails";
import { StockMapProvider, useStockMap } from "./context/StockMapContext";
import { cn } from "@/lib/util";
import { ListCollapse, Loader2 } from "lucide-react";
import FilterDetails from "./components/FilterDetails";

// import { Icon, Point } from "leaflet";
const MarkedMap = dynamic(() => import("@/components/MarkedMap"), {
  ssr: false,
  loading: () => <MarkedMapLoader />,
});

type SearchLevel = {
  zoom: number;
  range: number;
};

const defaultUserLocation: UserLocation = {
  x: 6.643338,
  y: 36.308012,
};

const StockMap = () => {
  const { searchParams, setSearchQueryValue, setSearchQueryValues } =
    useSearchQueryParams();

  const {
    pharmaciesPage,
    isLoadingPharmacies,
    userLocation,
    setUserLocation,
    isGeolocatingPosition,
    map,
    setMap,
    pharmaciesFilter,
    isSelectingLocation,
    setIsSelectingLocation,
    range,
  } = useStockMap();
  const approximatePharmacies = pharmaciesPage?.content;

  const selectedPharmacy = React.useMemo(() => {
    return Number.parseInt(searchParams.get("selected-pharmacy") ?? "") || 0;
  }, [searchParams]);

  const { pharmacyMarkers } = useMemo(() => {
    const pharmacyMarkers: PharmacyMarker[] = [];

    if (approximatePharmacies && userLocation) {
      approximatePharmacies.forEach((pharmacy) => {
        pharmacyMarkers.push({
          data: pharmacy,
          isSelected: pharmacy.id === selectedPharmacy,
          eventHandlers: {
            click: (e) => {
              setSearchQueryValue("selected-pharmacy", pharmacy.id);
            },
          },

          toolTip: (
            <div className="w-64 h-30  flex flex-col">
              <div
                className=" h-20"
                style={{
                  backgroundImage: `url(${pharmacy.picture})`,
                  backgroundRepeat: "round",
                  backgroundPosition: "cover",
                }}
              ></div>
              <div className="p-4 text-lg font-normal ">{pharmacy.name}</div>
            </div>
          ),
        });
      });
    }

    return { pharmacyMarkers };
  }, [
    approximatePharmacies,
    userLocation,
    setSearchQueryValue,
    selectedPharmacy,
  ]);

  React.useEffect(() => {
    let onmapClick = (e: LeafletMouseEvent) => {
      setUserLocation({
        x: e.latlng.lng,
        y: e.latlng.lat,
      });
      setIsSelectingLocation(false);
    };
    if (isSelectingLocation && map) {
      map.on("click", onmapClick);
    }

    return () => {
      if (map) {
        map.off("click", onmapClick);
      }
    };
  }, [map, isSelectingLocation, setUserLocation, setIsSelectingLocation]);

  React.useEffect(() => {
    if (!!map && !!userLocation) {
      map.flyTo(
        {
          lat: userLocation.y,
          lng: userLocation.x,
        },
        getZoomByRange(range)
      );
    }
  }, [map, userLocation, range]);

  const centerLocation = userLocation ?? defaultUserLocation;
  const circles: CircleDefiner[] = [];

  if (userLocation) {
    circles.push({
      key: "user circle",
      location: userLocation,
      radius: range,
    });
  }

  let markers = [...pharmacyMarkers];

  return (
    <>
      <div
        className={cn(
          "stock-map h-full w-full min-h-full min-w-full relative",
          {
            "cursor-cell": true,
          }
        )}
      >
        <PharmacyStockDisplayer />
        <div className=" z-30 absolute    top-0 right-0 left-0 bottom-0  pointer-events-none p-4  flex justify-between ">
          <div></div>
          <div className="relative flex flex-col gap-2 items-center ">
            <MapDetails />
            <FilterDetails />
          </div>
        </div>
        {(isLoadingPharmacies || isGeolocatingPosition) && (
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-muted/30 z-20 grid place-items-center">
            <Loader2 className="animate-spin text-muted-foreground size-8" />
          </div>
        )}

        <MarkedMap
          onMapLoad={(map) => {
            setMap(map);
          }}
          key={``}
          containerProps={{
            className: cn("h-full w-full min-h-full min-w-full z-10"),
            zoom: 8,
            center: { lat: centerLocation.y, lng: centerLocation.x },
            style: {
              cursor: isSelectingLocation ? "crosshair" : "grab",
            },
            // zoomControl: false,
          }}
          display={{
            pharmacyMarkers: markers,
            userLocation: {
              circle: {},
              range: range,

              position: userLocation,
              popUp: (
                <div className="flex flex-col gap-2 items-center">
                  <div>Tu est Ici</div>
                  <div>
                    <button
                      className="px-2 py-1 bg-primary-red text-white text-xs rounded"
                      onClick={() => {
                        setUserLocation(null);
                      }}
                    >
                      Anuller
                    </button>
                  </div>
                </div>
              ),
            },
            // circles: circles,
          }}
        />
      </div>
    </>
  );
};

const WrappedStockMap = () => {
  return (
    <StockMapProvider>
      <StockMap />
    </StockMapProvider>
  );
};

export default WrappedStockMap;
