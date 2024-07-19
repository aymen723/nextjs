"use client";
import { OrderRespData } from "@/client/types/responses/StockResponses";
import ProductsPaginator from "@/components/market/pages/products/ProductsPaginator";
import OrderList from "@/components/market/pages/user/purchases/OrderList";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import useSearchOrders from "@/util/hooks/api/useSearchOrders";

import React from "react";

const ClientPurchasesPage = () => {
  const { searchParams } = useSearchQueryParams();
  const { data: ordersPage, isLoading } = useSearchOrders({
    page: searchParams.get("page") ?? 1,
    pageSize: 20,
  });
  React.useEffect(() => {
    console.log("orders ", ordersPage);
  }, [ordersPage]);
  return (
    <div className="p-4 flex flex-col ">
      <ProductsPaginator page={ordersPage} />

      <OrderList orders={ordersPage?.content ?? []} isLoading={isLoading} />
    </div>
  );
};

export default ClientPurchasesPage;
