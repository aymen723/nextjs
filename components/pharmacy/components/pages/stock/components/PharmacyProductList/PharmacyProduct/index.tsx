import { updateStockInfo } from "@/client/api/stockService/stockApi";
import {
  AvailableStockRespData,
  ProductRespData,
} from "@/client/types/responses/StockResponses";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/util";
import { isValid } from "@/util/lib/utils";
import { Pencil, Trash } from "lucide-react";
import React from "react";
import StockPriceChanger from "./StockPriceChanger";

type Props = {
  stock: AvailableStockRespData;
  setStock: (
    func: (old: AvailableStockRespData[]) => AvailableStockRespData[]
  ) => void;
};

const PharmacyProduct = ({ stock: s, setStock }: Props) => {
  const availableData = s.privateData;
  const isShown = availableData?.overridden
    ? availableData.overriddenAvailability
    : availableData?.available;
  return (
    <div key={`${s.id.pharmacyId}/${s.id.productId}`} className="flex  h-14 ">
      <div className="h-full">
        <img
          src={s.product.picture}
          alt={s.product.name}
          className="min-w-16 w-16 max-w-16 min-h-full h-full max-h-full"
        />
      </div>
      <div className="w-full p-2 flex items-center justify-between">
        <div
          className="whitespace-nowrap  overflow-ellipsis overflow-hidden max-w-32 w-32  flex flex-col "
          title={s.product.name}
        >
          <div>{s.product.name}</div>
          <StockPriceChanger stock={s} setStock={setStock} />
        </div>

        <div className="flex items-center justify-center w-10   h-full">
          <div
            className={cn("size-4 rounded-full bg-red-400 shadow", {
              "bg-green-400": isShown,
            })}
          ></div>
        </div>
        <div className="flex items-center justify-center w-10   h-full">
          <div
            className={cn("size-4 rounded-full bg-red-400 shadow", {
              "bg-green-400": availableData?.available,
            })}
          ></div>
        </div>
        <div className="flex items-center   h-full">
          <Switch
            className=""
            id={s.product.id + ""}
            checked={s.privateData?.overridden}
            onCheckedChange={(checked) => {
              updateStockInfo(s.id, {
                overridden: checked,
              });
              setStock((old) =>
                old.map((os) => {
                  if (os.id === s.id) {
                    return {
                      ...os,
                      privateData: {
                        available: !!os.privateData?.available,
                        overridden: checked,
                        overriddenAvailability:
                          !!os.privateData?.overriddenAvailability,
                      },
                    };
                  }
                  return os;
                })
              );
            }}
          />
        </div>
        <div className="flex items-center   h-full">
          <Switch
            className=""
            id={s.product.id + ""}
            checked={s.privateData?.overriddenAvailability}
            onCheckedChange={(checked) => {
              updateStockInfo(s.id, {
                overriddenAvailability: checked,
              });
              setStock((old) =>
                old.map((os) => {
                  if (os.id === s.id) {
                    return {
                      ...os,
                      privateData: {
                        available: !!os.privateData?.available,
                        overridden: !!os.privateData?.overridden,
                        overriddenAvailability: checked,
                      },
                    };
                  }
                  return os;
                })
              );
            }}
          />
        </div>

        <button className="rounded-full p-2 hover:bg-red-100 transition-colors">
          <Trash className="size-5 text-primary-red" />
        </button>
      </div>
    </div>
  );
};

export default PharmacyProduct;
