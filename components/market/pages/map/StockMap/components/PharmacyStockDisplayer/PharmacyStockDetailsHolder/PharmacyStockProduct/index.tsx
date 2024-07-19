import { AvailableStockRespData } from "@/client/types/responses/StockResponses";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { routeToProduct } from "@/util/lib/routes/pathManipulation";
import { cn } from "@/util/lib/utils";
import { ShoppingCart, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  data: AvailableStockRespData;
  onBuy: (stock: AvailableStockRespData) => void;
  isInCart: boolean;
  onDelete: () => void;
  clientAuthed: boolean;
};
const PharmacyStockProduct = ({
  data: stock,
  onBuy,
  isInCart,
  onDelete,
  clientAuthed,
}: Props) => {
  const product = stock.product;
  const isSpecificPrice = !!stock.price;
  const canPurchase = clientAuthed && stock.purchasable;
  return (
    <div className="flex  gap-4 p-2 justify-between">
      <HoverCard openDelay={500}>
        <HoverCardTrigger>
          <div className="flex gap-2 items-center">
            <img src={product.picture} className="h-12 w-12 rounded" />
            <div className="text-sm max-w-36  text-nowrap overflow-hidden overflow-ellipsis   ">
              <Link
                href={routeToProduct(product.id)}
                className="hover:text-primary-green hover:underline"
                target="_blank"
                title={product.name}
              >
                {product.name}
              </Link>
              <div className="text-[0.6rem] text-primary-green">
                {stock.price ?? product.price} dzd
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent side="left" className="p-0 w-72">
          <ScrollArea className="max-h-96">
            <div
              className="h-48  bg-cover bg-repeat-round"
              style={{
                backgroundImage: `url(${product.picture})`,
              }}
            ></div>
            <div className="max-h-48">
              <div className="p-4 flex flex-col gap-4">
                <div className="text-sm font-medium">{product.name}</div>
                <div className="text-xs text-muted-foreground">
                  {product.description}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.tags.map((tag) => {
                    return (
                      <Link
                        key={tag.id}
                        href={`/market/products?tags=${tag.id}`}
                        target="_blank"
                      >
                        <div className="p-1 bg-muted rounded text-center text-xs">
                          {tag.name}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </HoverCardContent>
      </HoverCard>
      {!canPurchase ? (
        <div className="flex flex-col items-end">
          <div
            className={cn("flex gap-1 text-sm", {
              "text-primary-green": isSpecificPrice,
            })}
          >
            <span className="">
              {isSpecificPrice
                ? stock.price?.toFixed(2)
                : product.price.toFixed(2)}
            </span>
            <span>dzd</span>
          </div>

          <div
            className={cn(
              "bg-muted py-0.5 text-xs text-center select-none w-16",
              {
                "text-primary-green": isSpecificPrice,
              }
            )}
          >
            {isSpecificPrice ? "exact" : "géneral"}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <button
            className={cn(
              "text-xs flex gap-1 text-white bg-primary-green px-2 py-2 rounded",
              {
                "bg-primary-red": isInCart,
              }
            )}
            onClick={() => {
              if (!isInCart) onBuy(stock);
              else {
                onDelete();
              }
            }}
          >
            <div>{!isInCart ? "+" : "-"}</div>
            <div>
              {!isInCart ? (
                <ShoppingCart className="size-4" />
              ) : (
                <Trash className="size-4" />
              )}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PharmacyStockProduct;
