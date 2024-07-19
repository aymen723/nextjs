import { OrderRespData } from "@/client/types/responses/StockResponses";
import React from "react";
import Order from "./Order";
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
import OrderDetails from "./OrderDetails";
import { List, Loader2 } from "lucide-react";
type Props = {
  orders: OrderRespData[];
  isLoading: boolean;
  showUrl?: boolean;
};

const OrderList = ({ orders, isLoading, showUrl = true }: Props) => {
  const { searchParams, setSearchQueryValue } = useSearchQueryParams();
  const selectedOrder = Number.parseInt(
    searchParams.get("selected-order") ?? "0"
  );

  return (
    <>
      <OrderDetails showUrl={showUrl} selectedOrder={selectedOrder} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>État</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Livré</TableHead>
            <TableHead className="text-right">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!orders.length &&
            !isLoading &&
            orders.map((order) => (
              <Order
                order={order}
                key={order.id}
                onClick={(order) => {
                  setSearchQueryValue("selected-order", order.id);
                }}
              />
            ))}
        </TableBody>
      </Table>
      {!orders.length && !isLoading && (
        <div className="grid place-items-center h-32 text-muted-foreground">
          <span>Vide</span>
        </div>
      )}

      {isLoading && (
        <div className="h-32 grid place-items-center">
          <Loader2 className="size-5 animate-spin" />
        </div>
      )}
    </>
  );
};

export default OrderList;
