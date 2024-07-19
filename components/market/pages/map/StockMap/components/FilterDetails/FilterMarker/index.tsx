import { ProductRespData } from "@/client/types/responses/StockResponses";
import { cn } from "@/lib/util";
import { ListCollapse } from "lucide-react";
import React from "react";

type Props = {
  products: ProductRespData[] | undefined;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

const FilterMarker = ({ products, isOpen, setIsOpen }: Props) => {
  return (
    <div
      role="button"
      className={cn(
        "relative size-8 bg-muted-foreground rounded-full pointer-events-auto cursor-pointer grid place-content-center shadow-md",
        {
          "opacity-0": isOpen,
        }
      )}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <ListCollapse className="size-4 text-primary-light" />
      {!!products && !!products.length && (
        <div className="absolute top-[-5%] right-[-5%] max-h-4 max-w-4 size-4 bg-primary-green text-white grid place-items-center rounded-full text-xs whitespace-nowrap overflow-ellipsis">
          {products.length}
        </div>
      )}
    </div>
  );
};

export default FilterMarker;
