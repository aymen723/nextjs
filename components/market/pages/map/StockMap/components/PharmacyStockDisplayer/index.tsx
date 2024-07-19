"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/util/lib/utils";
import useGetPharmacy from "@/util/hooks/api/useGetPharmacy";
import useSearchPharmacyStock from "@/util/hooks/api/useSearchPharmacyStock";

import { motion as m } from "framer-motion";
import { Loader2, ShoppingCart, SquareArrowOutUpRight, X } from "lucide-react";

import React from "react";

import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import useGetPharmacyUptime from "@/util/hooks/api/useGetPharmacyUptime";

import { useStockMap } from "../../context/StockMapContext";
import PharmacyCart from "./PharmacyStockDetailsHolder/PharmacyCart";
import { AvailableStockRespData } from "@/client/types/responses/StockResponses";
import PharmacyStockDetailsHolder from "./PharmacyStockDetailsHolder";

const PharmacyStockDisplayer = () => {
  const { searchParams } = useSearchQueryParams();
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedPharmacy = React.useMemo(() => {
    return Number.parseInt(searchParams.get("selected-pharmacy") ?? "") || 0;
  }, [searchParams]);
  React.useEffect(() => {
    setIsOpen(!!selectedPharmacy);
  }, [selectedPharmacy]);
  return (
    <m.div
      animate={{
        x: isOpen ? "0" : "100%",
        transition: {
          duration: 0.3,
        },
      }}
      className={cn(
        "absolute top-0 right-0  bottom-0 bg-white z-40 w-72 flex flex-col shadow-md ",
        {}
      )}
    >
      <PharmacyStockDetailsHolder key={selectedPharmacy} />
      {/* <ScrollArea className="flex-1  overflow-auto">
        {!allSet ? (
          <PharamcyStockLoader />
        ) : (
          <>
            <div
              className="h-36 bg-cover relative"
              style={{
                backgroundImage: `url(${pharmacyData?.picture})`,
              }}
            >
              <a
                className="absolute top-1 left-1 p-2 rounded-full text-primary-green shadow-2xl bg-muted "
                href={getGoogleUrlFromLocation(pharmacyData.location)}
                target="_blank"
              >
                <SquareArrowOutUpRight className="size-3" />
              </a>
              <button
                className="absolute top-1 right-1 p-2 rounded-full text-primary-green shadow-2xl bg-muted "
                onClick={() => {
                  deleteSearchQuery("selected-pharmacy");
                }}
              >
                <X className="size-3" />
              </button>

              {CartStock.length && (
                <button
                  className="absolute bottom-1 left-1 p-2 rounded-full text-primary-green shadow-2xl bg-muted "
                  onClick={() => {
                    setCartIsOpen(true);
                  }}
                >
                  <ShoppingCart className="size-3" />
                  <div className="absolute top-[-20%] right-[-20%] bg-primary-green text-white size-4 rounded-full text-[0.5rem] grid place-items-center">
                    {CartStock.length}
                  </div>
                </button>
              )}
            </div>
            <div className="p-4 ">
              <div className="flex justify-between items-center">
                <Link
                  href={`/pharmacies/${pharmacyData.id}`}
                  className="text-lg font-light hover:font-medium "
                >
                  {pharmacyData.name}
                </Link>

                {isLoadingPharmacy ? (
                  <Loader2 className="text-muted-foreground animate-spin" />
                ) : (
                  <div
                    className={cn("p-2 bg-red-500 rounded-full", {
                      "bg-primary-green": !!pharmacyUptime?.open,
                    })}
                  ></div>
                )}
              </div>
            </div>

            <Tabs defaultValue="stock">
              <TabsList className="w-full text-sm">
                <TabsTrigger className="w-full  text-xs" value="stock">
                  Stock Disponible : {stockPage.totalElements}
                </TabsTrigger>
                <TabsTrigger className="w-full  text-xs" value="info">
                  Info
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stock">
                <div
                  className={cn({
                    "pb-12": showSelectBuy,
                  })}
                >
                  {stockPage.content.map((stock) => {
                    return (
                      <PharmacyStockProduct
                        key={`${stock.id.pharmacyId}/${stock.id.productId}`}
                        data={stock}
                        onBuy={(stock) => {
                          setCartStock((old) => {
                            if (
                              !old.find(
                                (s) => s.stock.product.id === stock.product.id
                              )
                            )
                              return [...old, { stock: stock, count: 1 }];
                            return [...old];
                          });
                          setCartIsOpen(true);
                        }}
                      />
                    );
                  })}

                  <PharmacyCart
                    key={selectedPharmacy}
                    pharmacyData={pharmacyData}
                    cartStock={CartStock}
                    setCartStock={setCartStock}
                    isOpen={isCartOpen}
                    setIsOpen={setCartIsOpen}
                  />

                  {showSelectBuy && (
                    <div
                      className="absolute h-12  bottom-0 left-0 right-0  flex items-center justify-center pointer-events-none"
                      role="button"
                    >
                      <button
                        className="bg-primary-green/90 text-white px-2 py-1 shadow-lg pointer-events-auto rounded"
                        onClick={() => {
                          setCartStock(
                            buyableStock.map((b) => ({
                              stock: b,
                              count: 1,
                            }))
                          );
                          setCartIsOpen(true);
                        }}
                      >
                        Achetter les selecté ({buyableStock.length})
                      </button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="info">
                <div className="p-2 flex flex-col gap-4">
                  <div className="flex flex-col gap-2 bg-muted text-sm p-2">
                    <div className="flex gap-2">
                      <span className="font-semibold whitespace-nowrap overflow-ellipsis">
                        nom :
                      </span>
                      <span>{pharmacyData.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold whitespace-nowrap overflow-ellipsis">
                        N telephone :
                      </span>
                      <span>{pharmacyData.phoneNumber}</span>
                    </div>
                  </div>
                  {pharmacyUptime && pharmacyUptime.uptimes && (
                    <div className="flex flex-col gap-2  p-2">
                      {pharmacyUptime.uptimes.map((uptime) => {
                        const isToday =
                          new Date().getDay() === weekDayNum[uptime.day];
                        return (
                          <div
                            key={uptime.id}
                            className={cn(
                              "flex gap-2 bg-muted-foreground/20 p-2 justify-between rounded-sm",
                              {
                                "bg-primary-green text-white": isToday,
                              }
                            )}
                          >
                            <span className="capitalize">
                              {weekDayFr[uptime.day]}
                            </span>
                            <div className="flex gap-2">
                              <div className="flex gap-0">
                                {uptime.openTime.substring(0, 5)}
                              </div>
                              <div>a</div>
                              <div className="flex gap-0">
                                {uptime.closeTime.substring(0, 5)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </ScrollArea> */}
    </m.div>
  );
};

export default PharmacyStockDisplayer;
