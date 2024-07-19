"use client";

import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";

import dynamic from "next/dynamic";
import useSearchProducts from "@/util/hooks/api/useSearchProducts";
import { MapPin } from "lucide-react";
import { cn } from "@/util/lib/utils";
import MarketProduct from "@/components/market/pages/index/MarketProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { appPaths } from "@/util/lib/routes/static";
import { routeToMap } from "@/util/lib/routes/pathManipulation";
// import StockMap from "@/components/market/StockMap";

const filterTags = [
  {
    name: "pilules",
    id: 6,
  },
  {
    name: "capsule",
    id: 16,
  },
  {
    name: "collyre",
    id: 1,
  },
];

const MarketPage = () => {
  const [selectedTag, setSelectedTag] = React.useState<number | null>(null);
  const router = useRouter();
  const { productsPage, isProductsLoading } = useSearchProducts({
    tags: selectedTag ? [selectedTag] : [],
    pageSize: 12,
  });
  const products = productsPage?.content;

  React.useEffect(() => {}, [products]);

  return (
    <>
      <div className="p-8 ">
        <div
          className="h-40  rounded-lg py-2 "
          style={{
            backgroundImage:
              "url(https://images.squarespace-cdn.com/content/v1/5623a379e4b04bb42a19b10d/1532939394302-DTTXRBQ4CDZPXF0RL9V7/6+Possible+Causes+Of+Back+Pain+And+The+Long-Term+Treatment+You%E2%80%99ve+Always+Wanted.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="py-4">
          <div className="">
            <h2 className="font-normal text-xl">Medicines</h2>
          </div>
          <div className="flex gap-2 py-2">
            <div
              className={cn(
                "px-3 py-1 rounded-xl  text-xs text-muted-foreground shadow-sm cursor-pointer  capitalize",
                {
                  "bg-gradient-to-b from-primary-green/80 to-primary-green text-white":
                    selectedTag === null,
                }
              )}
              onClick={() => setSelectedTag(null)}
            >
              Tous
            </div>
            {filterTags.map((tag) => {
              return (
                <div
                  className={cn(
                    "px-2 py-1 rounded-xl bg-background text-xs text-muted-foreground shadow-sm cursor-pointer capitalize",
                    {
                      "bg-gradient-to-b from-primary-green/80 to-primary-green text-white":
                        selectedTag === tag.id,
                    }
                  )}
                  onClick={() => setSelectedTag(tag.id)}
                  key={tag.id}
                >
                  {tag.name}
                </div>
              );
            })}
          </div>
          <div className="py-4 flex gap-8 flex-wrap  justify-start ">
            {isProductsLoading ? (
              <>
                {new Array(6).fill(null).map((sk, i) => {
                  return (
                    <Skeleton key={i} className="w-72 h-64 bg-background" />
                  );
                })}
              </>
            ) : (
              <>
                {products &&
                  products.map((prod) => {
                    return (
                      <MarketProduct
                        key={prod.id}
                        data={prod}
                        onLocate={(location) => {
                          router.push(
                            routeToMap({
                              products: prod.id,
                              x: location.x,
                              y: location.y,
                            })
                          );
                        }}
                      />
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPage;
