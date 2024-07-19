import { fetchOrderById } from "@/client/api/stockService/orderApi";
import { fetchPharmacyById } from "@/client/api/stockService/pharmacyApi";
import {
  OrderRespData,
  PharmacyRespData,
} from "@/client/types/responses/StockResponses";

import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

const useGetOrder = (
  orderId: OrderRespData["id"],
  config?: UndefinedInitialDataOptions<AxiosResponse<OrderRespData>>
) => {
  const queryResult = useQuery({
    ...config,
    queryKey: ["order", "id", orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: config?.enabled ?? !!orderId,
    select: (res) => res.data,
  });

  return queryResult;
};

export default useGetOrder;
