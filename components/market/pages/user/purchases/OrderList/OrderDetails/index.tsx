import { fetchPaymentById } from "@/client/api/paymentService/paymentApi";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import useGetOrder from "@/util/hooks/api/useGetOrder";
import useGetPayment from "@/util/hooks/api/useGetPayment";
import { Loader2, SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  OrderStatusFr,
  getGoogleUrlFromLocation,
} from "@/util/lib/dataConversion";
import { cn } from "@/lib/util";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getGoogleMapURL } from "@/util/lib/urlTransformation";
type Props = {
  selectedOrder: number;
  showUrl: boolean;
};
const OrderDetails = ({ selectedOrder, showUrl }: Props) => {
  const { deleteSearchQuery } = useSearchQueryParams();
  const {
    data: orderData,
    isLoading: isLoadingOrder,
    isError: isOrderError,
  } = useGetOrder(selectedOrder);
  const {
    data: paymentData,
    isLoading: isLoadingPayment,
    isError: paymentError,
  } = useGetPayment(orderData?.paymentId ?? 0);

  const showPayment = !isLoadingPayment && !isLoadingPayment && !!paymentData;
  const total = React.useMemo(() => {
    let total = 0;
    if (showPayment) {
      total += paymentData.transactionFee + (paymentData.deliveryPrice ?? 0);
    }
    total +=
      orderData?.purchases.reduce((prev, next) => {
        return prev + next.count * next.productPrice;
      }, 0) ?? 0;
    return total.toFixed(2);
  }, [orderData, showPayment, paymentData]);

  //   React.useEffect(() => {
  //     console.log("payment err", paymentData);
  //   }, [paymentData]);

  const isLoading = isLoadingOrder || isLoadingPayment;

  const isError = isOrderError || paymentError;
  return (
    <Dialog
      open={!!selectedOrder}
      onOpenChange={(val) => {
        if (!val) {
          deleteSearchQuery("selected-order");
        }
      }}
    >
      <DialogContent>
        {isLoading ? (
          <div className="p-8">
            <Loader2 className="size-5 animate-spin mx-auto" />
          </div>
        ) : (
          <>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="text-sm">details</span>
                </AccordionTrigger>
                <AccordionContent>
                  {!!orderData && (
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 text-sm">
                        <span className="text-nowrap">état : </span>
                        <span
                          className={cn("capitalize", {
                            "text-primary-green":
                              orderData.status === "FINALISED",
                            "text-orange-500": orderData.status === "PENDING",
                            "text-red-500": orderData.status === "CANCELED",
                          })}
                        >
                          {OrderStatusFr[orderData.status]}
                        </span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="text-nowrap">pharmacy : </span>
                        <span className="flex gap-4 items-center">
                          <span className="hover:underline">
                            {orderData.pharmacy.name}
                          </span>
                          <a
                            href={
                              orderData.pharmacy.location.googleUrl ??
                              getGoogleUrlFromLocation(
                                orderData.pharmacy.location
                              )
                            }
                            target="_blank"
                          >
                            <SquareArrowOutUpRight className="size-4" />
                          </a>
                        </span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="text-nowrap">code : </span>
                        <span>{orderData.secret}</span>
                      </div>

                      {orderData.status === "PENDING" &&
                        paymentData &&
                        showUrl && (
                          <div className="flex gap-2 text-sm">
                            <span className="text-nowrap overflow-hidden">
                              paymentUrl :{" "}
                            </span>
                            <a
                              target="_blank"
                              className=" hover:underline text-purple-700"
                              href={paymentData.checkouturl}
                            >
                              lien
                            </a>
                          </div>
                        )}
                      <div className="flex justify-center p-8">
                        <QRCodeSVG value={orderData.secret} />
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nom</TableHead>
                  <TableHead
                    onClick={() => {
                      fetchPaymentById(orderData?.paymentId ?? 0)
                        .then((res) => {
                          console.log("payment res", res.data);
                        })
                        .catch((e) => {
                          console.log("payment error", e);
                        });
                    }}
                  >
                    Prix
                  </TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData?.purchases.map((purchase) => (
                  <TableRow key={purchase.product.id}>
                    <TableCell className="font-medium">
                      {purchase.product.name}
                    </TableCell>
                    <TableCell className="capitalize">
                      {purchase.productPrice.toFixed(2)}
                    </TableCell>
                    <TableCell>{purchase.count}</TableCell>
                    <TableCell className="text-right">
                      {(purchase.productPrice * purchase.count).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                {!!paymentData?.deliveryPrice && (
                  <TableRow>
                    <TableCell className="font-medium text-primary-green/80">
                      Livraison
                    </TableCell>
                    <TableCell className="capitalize">
                      {paymentData.deliveryPrice.toFixed(2)}
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell className="text-right">
                      {paymentData.deliveryPrice.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )}

                {!!paymentData?.transactionFee && (
                  <TableRow>
                    <TableCell className="font-medium text-primary-green/80">
                      Transaction
                    </TableCell>
                    <TableCell className="capitalize">
                      {paymentData.transactionFee.toFixed(2)}
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell className="text-right">
                      {paymentData.transactionFee.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">{total} Dzd</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
