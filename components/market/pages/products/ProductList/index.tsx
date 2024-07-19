"use client";
import { ProductRespData } from "@/client/types/responses/StockResponses";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import React from "react";
import SingleProduct from "../SingleProduct";
import { useRouter } from "next/navigation";
import { routeToMap } from "@/util/lib/routes/pathManipulation";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  data: ProductRespData[];
  isLoading?: boolean;
};

const ProductList = ({ data: products, isLoading = false }: Props) => {
  const router = useRouter();

  return (
    <ScrollArea className="flex flex-col h-full gap-1 w-full relative">
      {isLoading ? (
        // <div className="absolute bg-muted/60 top-0 left-0 right-0 bottom-0 grid place-items-center">
        //   <Loader2 className="size-5 animate-spin text-primary-green" />
        // </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="bg-gray-200 h-28" />
          <Skeleton className="bg-gray-200 h-28" />
          <Skeleton className="bg-gray-200 h-28" />
          <Skeleton className="bg-gray-200 h-28" />
        </div>
      ) : (
        <div>
          <div className="bg-background">
            {products.map((prod, i) => {
              const isLast = i === products.length - 1;
              return (
                <div className="" key={prod.id}>
                  <SingleProduct
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
                  {!isLast && (
                    <div className="py-4 px-8">
                      <div className="h-[1px] bg-muted-foreground/30 rounded-lg"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ScrollArea>
  );
};

export default ProductList;
