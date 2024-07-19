import { OrderRespData } from "@/client/types/responses/StockResponses";
import React from "react";
import dayjs from "dayjs";
import { TableCell, TableRow } from "@/components/ui/table";
import { OrderStatusFr } from "@/util/lib/dataConversion";
import { cn } from "@/lib/util";
type Props = {
  order: OrderRespData;
  onClick: (order: OrderRespData) => void;
};
const Order = ({ order, onClick }: Props) => {
  const date = dayjs(order.date);

  return (
    <TableRow
      key={order.id}
      onClick={() => {
        onClick(order);
      }}
      className="hover:bg-muted-foreground/10 cursor-pointer"
    >
      {/* <TableCell className="font-medium">{order.id}</TableCell> */}
      <TableCell
        className={cn("capitalize", {
          "text-primary-green": order.status === "FINALISED",
          "text-orange-500": order.status === "PENDING",
          "text-red-500": order.status === "CANCELED",
        })}
      >
        {OrderStatusFr[order.status]}
      </TableCell>
      <TableCell>{date.format("DD/MM/YYYY")}</TableCell>
      <TableCell>{!!order.deliveryId ? "Oui" : "Non"}</TableCell>
      <TableCell className="text-right">
        {order.checkoutPrice?.toFixed(2) ?? order.price.toFixed(2)} Dzd
      </TableCell>
    </TableRow>
  );
};

export default Order;
