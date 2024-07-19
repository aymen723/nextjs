import { PharmacyRespData } from "@/client/types/responses/StockResponses";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brackets, X } from "lucide-react";
import React from "react";
import PharmacyDetails from "./ResultedPharmacies/PharmacyDetails";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { StockFilterParams } from "@/client/types/requests/StockRequests";
import { useAppSelector } from "@/util/hooks/redux";
import ResultedPharmacies from "./ResultedPharmacies";
import { GeoCoordinates } from "@/types/geoTypes";
import GeolocationDemander from "./GeolocationDemander";
import { useStockMap } from "../../../context/StockMapContext";
import { divIcon } from "leaflet";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

const MapDetailsHolder = ({
  isOpen,

  setIsOpen,
}: Props) => {
  const { pharmaciesPage, userLocation, setUserLocation } = useStockMap();
  const pharmacies = pharmaciesPage?.content;
  return (
    <>
      {isOpen && (
        <div className="z-10 w-60 h-60 bg-background p-1 absolute top-4 right-4  pointer-events-auto text-muted-foreground shadow-lg rounded-sm flex flex-col select-none">
          <div className="flex justify-between items-center p-2">
            <div className="text-xs ">
              {userLocation && (
                <div className="flex items-center justify-between gap-4 bg-primary-light/20 rounded p-2">
                  <span>Localisé</span>
                  <span>
                    <X
                      className="size-3 hover:text-primary-green cursor-pointer"
                      onClick={() => {
                        setUserLocation(null);
                      }}
                    />
                  </span>
                </div>
              )}
            </div>
            <div>
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
          {!!userLocation && <ResultedPharmacies />}

          {!userLocation && <GeolocationDemander />}
        </div>
      )}
    </>
  );
};

export default MapDetailsHolder;
