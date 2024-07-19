"use client";
import { PharmacyRespData } from "@/client/types/responses/StockResponses";
import React from "react";
import PharmacyDetails from "./MapDetailsHolder/ResultedPharmacies/PharmacyDetails";
import { Brackets, Loader2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { GeoCoordinates } from "@/types/geoTypes";
import { StockFilterParams } from "@/client/types/requests/StockRequests";
import { useAppSelector } from "@/util/hooks/redux";
import MapDetailsMarker from "./MapDetailsMarker";
import MapDetailsHolder from "./MapDetailsHolder";

type Props = {};

const MapDetails = ({}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2 items-center h-fit">
      <MapDetailsMarker isOpen={isOpen} setIsOpen={setIsOpen} />

      <MapDetailsHolder isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MapDetails;
