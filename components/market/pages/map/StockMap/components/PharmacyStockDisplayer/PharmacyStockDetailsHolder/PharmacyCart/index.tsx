import { postPayment } from "@/client/api/paymentService/paymentApi";
import { PaymentCreationRequest } from "@/client/types/requests/paymentRequests";
import {
  AvailableStockRespData,
  PharmacyRespData,
  ProductRespData,
} from "@/client/types/responses/StockResponses";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import {
  CircleMinus,
  CirclePlus,
  Loader2,
  MapPin,
  PinIcon,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useStockMap } from "../../../../context/StockMapContext";

type Props = {
  cartStock: StockRecord[];
  setCartStock: (func: (old: StockRecord[]) => StockRecord[]) => void;

  pharmacyData: PharmacyRespData | undefined;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

type StockRecord = {
  count: number;
  stock: AvailableStockRespData;
};

const PharmacyCart = ({
  cartStock,
  setCartStock,

  pharmacyData,

  isOpen,
  setIsOpen,
}: Props) => {
  const [delivering, setDelivering] = React.useState(false);
  const { userLocation } = useStockMap();
  const totalPrice = React.useMemo(() => {
    const deliveryPrice = delivering ? 200 : 0;
    const countPrice = cartStock.reduce((prev, current) => {
      return prev + (current.stock.price ?? 0) * current.count;
    }, 0);
    return (countPrice + deliveryPrice).toFixed(2);
  }, [cartStock, delivering]);

  const { mutateAsync: createPayment, isPending } = useMutation({
    mutationFn: (request: PaymentCreationRequest) => {
      return postPayment(request);
    },
  });

  React.useEffect(() => {
    if (!userLocation && delivering) {
      setDelivering(false);
    }
  }, [userLocation, delivering]);

  React.useEffect(() => {
    if (!cartStock.length && isOpen) {
      setIsOpen(false);
    }
  }, [cartStock, isOpen, setIsOpen]);
  return (
    <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      {/* <DialogTrigger>
     
      </DialogTrigger> */}

      <DrawerContent className="p-0  bg-muted  border-none overflow-hidden  ">
        <div className="">
          <div className="flex">
            <div>
              <div
                className="h-32 bg-red-300  bg-repeat-round w-80  "
                style={{
                  backgroundImage: `url(${pharmacyData?.picture})`,
                }}
              ></div>
              <div className="p-2 flex items-center justify-between max-w-[50rem] mx-auto">
                <span className="font-semibold">{pharmacyData?.name}</span>
                <button>
                  <MapPin className="text-primary-green" />
                </button>
              </div>
            </div>

            <div className="flex flex-col-reverse justify-between w-full">
              <ScrollArea className="py-4">
                <div className="  max-h-[60vh] flex flex-col p-2 gap-2 max-w-[50rem] mx-auto">
                  {cartStock.map((s) => {
                    return (
                      <div
                        key={s.stock.id.productId}
                        className="flex items-center justify-between h-14  bg-muted-foreground/5 rounded "
                      >
                        <div className="flex h-full gap-2 ">
                          <img
                            src={s.stock.product.picture}
                            alt={`product ${s.stock.product.name}`}
                            className="max-h-full h-full min-h-full max-w-20 w-20 min-w-20"
                          />
                          <div>
                            <div className="text-sm">
                              {s.stock.product.name}
                            </div>
                            <div className="text-[0.6rem] text-primary-green">
                              {s.stock.price}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 p-2">
                          <div>
                            {((s.stock.price ?? 0) * s.count).toFixed(2)} Dzd
                          </div>
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() => {
                                setCartStock((old) =>
                                  [...old].map((cs) => {
                                    if (
                                      cs.stock.product.id === s.stock.product.id
                                    )
                                      if (cs.count > 1)
                                        return {
                                          count: cs.count - 1,
                                          stock: cs.stock,
                                        };
                                    return cs;
                                  })
                                );
                              }}
                            >
                              <CircleMinus className="size-4 text-primary-green" />
                            </button>

                            <div>{s.count}</div>
                            <button
                              onClick={() => {
                                setCartStock((old) =>
                                  [...old].map((cs) => {
                                    if (
                                      cs.stock.product.id === s.stock.product.id
                                    )
                                      if (cs.count < 5)
                                        return {
                                          count: cs.count + 1,
                                          stock: cs.stock,
                                        };
                                    return cs;
                                  })
                                );
                              }}
                            >
                              <CirclePlus className="size-4 text-primary-green" />
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              setCartStock((old) =>
                                old.filter(
                                  (c) =>
                                    c.stock.product.id != s.stock.product.id
                                )
                              );
                            }}
                          >
                            <Trash2 className="text-primary-red  size-5 mx-2" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="flex justify-between items-center px-4  h-12 w-full  max-w-[50rem] mx-auto">
                <div className="flex items-center gap-1 ">
                  <Checkbox
                    id="delivery-check"
                    checked={delivering}
                    onCheckedChange={(val) => {
                      setDelivering(Boolean(val.valueOf()));
                    }}
                  />
                  <Label htmlFor="delivery-check">ajouter livraison</Label>
                </div>

                <Dialog>
                  <DialogTrigger>
                    <button
                      disabled={isPending}
                      className="px-2 py-1 text-white bg-primary-green rounded flex gap-1 items-center"
                      // onClick={() => {
                      //   if (pharmacyData)
                      //     createPayment({
                      //       delivery: false,
                      //       pharmacyId: pharmacyData.id,
                      //       products: cartStock.map((r) => {
                      //         return {
                      //           count: r.count,
                      //           productId: r.stock.id.productId,
                      //         };
                      //       }),
                      //     })
                      //       .then((res) => {
                      //         console.log("payment ::: ", res.data);
                      //         window.open(res.data.checkouturl, "_blank");
                      //         setIsOpen(false);
                      //         setCartStock((old) => []);
                      //       })
                      //       .catch((e) => {
                      //         console.log("payment err", e);
                      //       });
                      // }}
                    >
                      <span className="mx-1">
                        {isPending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <ShoppingCart className="size-4" />
                        )}
                      </span>
                      <span className="text-white">{totalPrice} dzd</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="">
                      <h2 className="font-bold text-2xl ">
                        Prix : {totalPrice} Dzd
                      </h2>
                      <div className="flex items-center gap-1 mt-4">
                        <Checkbox
                          id="delivery-check"
                          checked={delivering}
                          onCheckedChange={(val) => {
                            setDelivering(Boolean(val.valueOf()));
                          }}
                        />
                        <Label htmlFor="delivery-check">
                          ajouter livraison
                        </Label>
                      </div>
                      <div className="flex justify-between mt-4">
                        <button className="px-2 py-1 bg-primary-red text-white rounded flex gap-1">
                          Anuller
                        </button>
                        <button
                          className="px-2 py-1 bg-primary-green text-white rounded flex gap-1 items-center"
                          onClick={() => {
                            if (pharmacyData)
                              createPayment({
                                x: userLocation?.x,
                                y: userLocation?.y,
                                delivery: delivering,
                                pharmacyId: pharmacyData.id,
                                products: cartStock.map((r) => {
                                  return {
                                    count: r.count,
                                    productId: r.stock.id.productId,
                                  };
                                }),
                              })
                                .then((res) => {
                                  console.log("payment ::: ", res.data);

                                  window.open(res.data.checkouturl, "_blank");
                                  setIsOpen(false);
                                  setCartStock((old) => []);
                                })
                                .catch((e) => {
                                  console.log("payment err", e);
                                });
                          }}
                        >
                          {isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <ShoppingCart className="size-4" />
                          )}
                          <span>Confirmer</span>
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PharmacyCart;
