"use client";
import { ProductRespData } from "@/client/types/responses/StockResponses";
import { cn } from "@/util/lib/utils";
import { SquareArrowRight } from "lucide-react";
// import { SquareArrowRight } from "lucide-react";
import React from "react";
type Props = {
  data: ProductRespData;
  onSelect?: (prod: ProductRespData) => void;
  onAdd?: (prod: ProductRespData) => void;
};
const SearchProduct = ({ data: prod, onSelect, onAdd }: Props) => {
  return (
    <div
      className={cn(
        "p-2 text-md h-14 font-semibold cursor-pointer hover:bg-subtle-light z-30 flex  justify-between items-center  gap-4 text-xs"
      )}
      onClick={() => {
        onSelect?.(prod);
      }}
    >
      <div className="flex gap-4 h-full">
        <img
          src={prod.picture}
          className="min-h-full h-full max-h-full max-w-14 min-w-14 w-14 "
        ></img>
        <div className="flex flex-col ">
          <span>{prod.name}</span>
          <span className="text-[0.6rem] text-primary-green">
            {prod.price} dzd
          </span>
        </div>
      </div>
      <button
        className="hover:text-primary-green text-muted-foreground"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onAdd?.(prod);
        }}
      >
        <SquareArrowRight />
      </button>
    </div>
  );
};

export default SearchProduct;
