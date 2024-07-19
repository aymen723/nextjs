import { ProductRespData } from "@/client/types/responses/StockResponses";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/util";
import { Bookmark, Delete, Trash, X } from "lucide-react";
import React from "react";
import FilterProduct from "./FilterProduct";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { useStockMap } from "../../../context/StockMapContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { postBookmark } from "@/client/api/stockService/bookmarkApi";
import FilterBookmarker from "./FilterBookmarker";

type Props = {
  products: ProductRespData[];
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
};

const FilterHolder = ({ isOpen, setIsOpen, products }: Props) => {
  const { setSearchQueryValue } = useSearchQueryParams();
  const { filterProducts, range } = useStockMap();
  return (
    <div
      className={cn(
        "z-[5] w-60 h-60 bg-background p-1 absolute top-4 right-4  pointer-events-auto text-muted-foreground shadow-lg rounded-sm flex flex-col select-none",
        {
          hidden: !isOpen,
        }
      )}
    >
      <div className="p-2 flex justify-between items-center">
        <div className="w-full pr-4">
          <Select
            value={range.toString()}
            onValueChange={(value) => {
              setSearchQueryValue("range", value);
            }}
          >
            <SelectTrigger className="w-full max-h-8">
              <SelectValue placeholder="selectioné une protée" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Portée</SelectLabel>
                <SelectItem value="500">500m</SelectItem>
                <SelectItem value="1000">1km</SelectItem>
                <SelectItem value="2000">2km</SelectItem>
                <SelectItem value="4000">4km</SelectItem>
                <SelectItem value="6000">6km</SelectItem>
                <SelectItem value="10000">10km</SelectItem>
                <SelectItem value="15000">15km</SelectItem>
                <SelectItem value="30000">30km</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div
          className="cursor-pointer"
          role="button"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <X className="size-4" />
        </div>
      </div>
      <ScrollArea className="flex flex-col gap-2">
        {!!products.length && (
          <div>
            <div className="flex justify-between p-2">
              <button
                className="text-sm"
                onClick={() => {
                  setSearchQueryValue("products", []);
                }}
              >
                <Trash className="size-4" />{" "}
              </button>
              <FilterBookmarker
                key={products.reduce((prev, curr) => {
                  return prev + curr;
                }, "")}
                products={products}
              />
            </div>
            {products.map((prod) => {
              return (
                <FilterProduct
                  key={prod.id}
                  data={prod}
                  onDelete={() => {
                    setSearchQueryValue(
                      "products",
                      filterProducts
                        .map((pd) => pd.id)
                        .filter((id) => id !== prod.id)
                    );
                  }}
                />
              );
            })}
          </div>
        )}
        {!products.length && (
          <div className="grid place-items-center h-36">
            <span>Vide</span>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default FilterHolder;
