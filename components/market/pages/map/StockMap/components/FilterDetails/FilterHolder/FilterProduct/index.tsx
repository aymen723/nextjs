import { ProductRespData } from "@/client/types/responses/StockResponses";
import { Trash, X } from "lucide-react";
import React from "react";

type Props = {
  data: ProductRespData;
  onDelete: (prod: ProductRespData) => void;
};

const FilterProduct = ({ data: prod, onDelete }: Props) => {
  return (
    <div
      key={prod.id}
      className="h-14 bg-muted/30 flex gap-2 justify-between items-center p-2"
    >
      <div className="flex gap-2 h-full">
        <img
          src={prod.picture}
          alt={prod.name}
          className="max-h-full min-h-full h-full max-w-[30%] min-w-[30%s] w-[30%]"
        />
        <div>
          <div className="text-sm">{prod.name}</div>
          <div className="text-xs text-primary-green">{prod.price} dzd</div>
        </div>
      </div>

      <X
        className="size-4 hover:text-primary-red cursor-pointer"
        onClick={() => {
          onDelete(prod);
        }}
      />
    </div>
  );
};

export default FilterProduct;
