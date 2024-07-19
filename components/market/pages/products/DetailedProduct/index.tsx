"use client";
import {
  deleteBookmark,
  postBookmark,
} from "@/client/api/stockService/bookmarkApi";
import { ProductRespData } from "@/client/types/responses/StockResponses";
import Localiser from "@/components/market/components/Localiser";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/util";
import useSearchBookmarks from "@/util/hooks/api/useSearchBookmarks";
import { routeToMap } from "@/util/lib/routes/pathManipulation";
import { useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck, Loader, LocateFixedIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ProductBookmark from "./ProdBookmark";
import { useAppSelector } from "@/util/hooks/redux";
type Props = {
  data: ProductRespData;
};
const DetailedProduct = ({ data: product }: Props) => {
  const router = useRouter();
  const authData = useAppSelector((app) => app.auth.authData);

  const isClientAuthed = authData && authData.role === "CLIENT";

  return (
    <div className="h-full  ">
      <div className="flex justify-center h-full">
        <div className="flex gap-3">
          <ScrollArea className="gap-4 w-72 min-w-64 p-2">
            <div className="h-72 rounded overflow-hidden">
              <img
                alt={product.name}
                src={product.picture ?? ""}
                className="min-h-full min-w-full h-full w-full"
              />
            </div>
            <div className="flex pt-2 pl-2 text-sm justify-between items-center">
              <div className="flex gap-2">
                <span className="text-muted-foreground">prix :</span>
                <span>{product.price} Dzd</span>
              </div>
              <span className="">
                <Localiser
                  render={(isLocating) => {
                    return (
                      <button
                        className={cn(
                          "bg-primary-green text-white rounded px-2 py-1 flex gap-1 items-center text-xs"
                        )}
                      >
                        {isLocating ? (
                          <Loader className="text-white size-4 animate-spin" />
                        ) : (
                          <LocateFixedIcon className="text-white size-4" />
                        )}
                        Localiser
                      </button>
                    );
                  }}
                  onLocate={(location) => {
                    router.push(
                      routeToMap({
                        products: product.id,
                        x: location.x,
                        y: location.y,
                      })
                    );
                  }}
                />
              </span>
            </div>
            <div className="flex gap-2 flex-wrap pt-2 ">
              {product.tags.map((tag) => {
                return (
                  <HoverCard key={tag.id}>
                    <HoverCardTrigger>
                      <Link href={`/market/products?tags=${tag.id}`}>
                        <div
                          key={tag.id}
                          className="text-xs bg-white text-muted-foreground rounded-md px-2 py-1"
                        >
                          {tag.name}
                        </div>
                      </Link>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="text-xs ">{tag.description}</div>
                    </HoverCardContent>
                  </HoverCard>
                );
              })}
            </div>
          </ScrollArea>
          <ScrollArea className="  flex flex-col items-center p-4 h-full">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-center p-3">
                {product.name}
              </h2>

              {isClientAuthed ? <ProductBookmark product={product} /> : null}
            </div>

            <div className="">
              <div className="text-sm  ">{product.description}</div>
            </div>
            <div className="p-2 flex ">
              {product.notice && (
                <button className="px-2 py-1 bg-primary-green rounded text-white">
                  <a href={product.notice} target="_blank">
                    {" "}
                    telechargé notice
                  </a>
                </button>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
