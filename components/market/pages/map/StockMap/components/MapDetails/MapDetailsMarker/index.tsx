import { PharmacyRespData } from "@/client/types/responses/StockResponses";
import { GeoCoordinates } from "@/types/geoTypes";
import { useAppSelector } from "@/util/hooks/redux";
import { getGeolocation } from "@/util/lib/geolocation";
import { Loader2, MapPinOff } from "lucide-react";
import React from "react";
import { useStockMap } from "../../../context/StockMapContext";
import { cn } from "@/lib/util";

type Props = {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
};

const MapDetailsMarker = ({
  setIsOpen,

  isOpen,
}: Props) => {
  const { pharmaciesPage, isLoadingPharmacies, userLocation } = useStockMap();
  const pharmacies = pharmaciesPage?.content;
  const geolocationPermission = useAppSelector(
    (store) => store.globals.permissions.geolocationPermission
  );
  const isGeoloacationAccessable = geolocationPermission === "granted";
  const isDemandingAccess = geolocationPermission === "prompt";

  return (
    <>
      {
        <div
          className={cn(
            "relative w-8 h-8 rounded-full shadow-md bg-muted-foreground grid place-items-center pointer-events-auto cursor-pointer text-primary-light select-none",
            {
              "opacity-0": isOpen,
            }
          )}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {isLoadingPharmacies ? (
            <Loader2 className="animate-spin " />
          ) : !userLocation ? (
            <div>
              <MapPinOff className="text-red-500 size-4" />
            </div>
          ) : (
            <div className="text-xs">{pharmacies?.length}</div>
          )}
        </div>
      }
    </>
  );
};

export default MapDetailsMarker;
