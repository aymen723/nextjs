"use client";

import { PharmacyFilterParams } from "@/client/types/requests/PharmacyRequests";
import { StockFilterParams } from "@/client/types/requests/StockRequests";
import { PharmacyRespData } from "@/client/types/responses/StockResponses";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/util/lib/utils";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import useSearchPharmacyStock from "@/util/hooks/api/useSearchPharmacyStock";
import { Eye, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getGoogleUrlFromLocation } from "@/util/lib/dataConversion";

type Props = {
  data: PharmacyRespData;
  onHover: (pharmacy: PharmacyRespData) => any;
  onHoverOut: (pharmacy: PharmacyRespData) => any;
  onDetails?: (pharmacy: PharmacyRespData) => any;
  stockFilter: StockFilterParams;
};

const PharmacyDetails = ({
  data,
  onDetails,
  onHover,
  onHoverOut,
  stockFilter,
}: Props) => {
  const { stockPage, isLoadingStock, isErrorStock } = useSearchPharmacyStock(
    data.id,
    stockFilter
  );

  const stock = stockPage?.content;

  const oneProduct = stock?.length === 1 ? stock[0] : null;

  return (
    <div
      className={cn(
        "h-12  cursor-pointer  rounded-sm flex  p-1 justify-between hover:bg-muted hover:border text-[0.65rem] items-center"
      )}
      id={`pharma-details-${data.id}`}
      onClick={() => {
        onDetails?.(data);
      }}
      onMouseEnter={() => {
        onHover(data);
      }}
      onMouseLeave={() => {
        onHoverOut(data);
      }}
    >
      <div className="flex gap-2 items-center">
        <div
          className={cn("p-1.5 rounded-full bg-primary-green", {
            "bg-red-500": !data.upTimes.open,
          })}
        ></div>
        <a href={getGoogleUrlFromLocation(data.location)} target="_blank">
          <div className="text-[0.65rem] text-primary-green hover:underline">
            {data.name}
          </div>
        </a>
      </div>

      <div>
        {stockPage ? (
          <div
            className="flex gap-1 hover:text-primary-green"
            onClick={() => {
              onDetails?.(data);
            }}
          >
            {oneProduct && !!oneProduct.price ? (
              <div>{oneProduct.price} Dzd</div>
            ) : (
              <>
                <div>{stockPage.totalElements}</div>
                <button className="">
                  <Eye className="size-4" />
                </button>
              </>
            )}
          </div>
        ) : (
          <Loader2Icon className="size-2 animate-spin text-primary-green" />
        )}
      </div>
    </div>
  );
};

export default PharmacyDetails;
