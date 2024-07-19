import { useStockMap } from "@/components/market/pages/map/StockMap/context/StockMapContext";
import { GeoCoordinates } from "@/types/geoTypes";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { useAppSelector } from "@/util/hooks/redux";
import { getGeolocation } from "@/util/lib/geolocation";
import { Ban, Loader2, MapPinOff, MousePointer2 } from "lucide-react";
import React from "react";

type Props = {};

const GeolocationDemander = ({}: Props) => {
  const { searchParams, setSearchQueryValues } = useSearchQueryParams();
  const {
    userLocation,
    isGeolocatingPosition,
    geolocate,
    isSelectingLocation,
    setIsSelectingLocation,
  } = useStockMap();
  const geolocationPermission = useAppSelector(
    (store) => store.globals.permissions.geolocationPermission
  );

  const isGeoloacationAccessable = geolocationPermission === "granted";
  const isDemandingAccess = geolocationPermission === "prompt";
  const isLoading = isDemandingAccess || isGeolocatingPosition;

  return (
    <div className="flex-1 grid place-items-center">
      <div className="p-4 flex flex-col items-center gap-2">
        <div>
          <MapPinOff className="text-red-600 size-8" />
        </div>
        <div className="text-xs text-muted-foreground">
          {
            "emplacement non spécifié, souhaite spécifier l'emplacement en fonction de votre géolocalisation (gps)?"
          }
        </div>
        <div className="flex gap-4">
          <button
            className="px-2 py-1 text-sm bg-primary-green text-white flex items-center gap-2"
            onClick={() => {
              geolocate();
            }}
          >
            {isGeolocatingPosition && (
              <Loader2 className="size-3 animate-spin" />
            )}
            <span>Localiser</span>
          </button>
          <button
            className="px-2 py-1 text-sm bg-muted text-muted-foreground flex items-center gap-2 rounded shadow"
            onClick={() => {
              setIsSelectingLocation(!isSelectingLocation);
            }}
          >
            <span>
              {isSelectingLocation ? (
                <Ban className="size-4" />
              ) : (
                <MousePointer2 className="size-4" />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeolocationDemander;
