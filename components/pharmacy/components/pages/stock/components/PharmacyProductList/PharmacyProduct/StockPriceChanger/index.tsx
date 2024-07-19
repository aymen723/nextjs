import { updateStockInfo } from "@/client/api/stockService/stockApi";
import { AvailableStockRespData } from "@/client/types/responses/StockResponses";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/util";
import { isValid } from "@/util/lib/utils";
import { Pencil } from "lucide-react";
import React from "react";

type Props = {
  stock: AvailableStockRespData;
  setStock: (
    func: (old: AvailableStockRespData[]) => AvailableStockRespData[]
  ) => void;
};

const StockPriceChanger = ({ stock: s, setStock }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState(s.price?.toString() || "0");

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
      }}
    >
      <DialogTrigger>
        <button
          className="flex items-center gap-1 w-fit"
          //   onClick={() => {
          //     setOpen(true);
          //   }}
        >
          <div
            className={cn(
              "text-[0.6rem] p-1 rounded bg-muted w-fit text-muted-foreground select-none",
              {
                "text-primary-green": isValid(s.price),
              }
            )}
          >
            {s.price ?? s.product.price} Dzd
          </div>
          <Pencil className="size-3" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-center font-semibold">{s.product.name}</h2>
        {!!s.price && (
          <h3 className="text-sm text-primary-green">{s.price} Dzd</h3>
        )}
        <Input
          type="number"
          min={0}
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <button
          className="px-2 py-1 bg-muted-foreground text-secondary"
          onClick={() => {
            updateStockInfo(s.id, {
              price: Number.parseInt(price),
            }).then((res) => {
              setOpen(false);
              setStock((old) =>
                old.map((stock) => {
                  if (stock.id === s.id) {
                    return res.data;
                  }
                  return stock;
                })
              );
            });
          }}
        >
          Changer
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default StockPriceChanger;
