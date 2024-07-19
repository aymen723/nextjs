import { fetchPaymentById } from "@/client/api/paymentService/paymentApi";
import { fetchOrderById } from "@/client/api/stockService/orderApi";
import { fetchPharmacyById } from "@/client/api/stockService/pharmacyApi";
import {
  OrderRespData,
  PharmacyRespData,
} from "@/client/types/responses/StockResponses";
import { PaymentRespData } from "@/client/types/responses/paimentResponses";

import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

const useGetPayment = (
  paymentId: PaymentRespData["paymentId"],
  config?: UndefinedInitialDataOptions<AxiosResponse<PaymentRespData>>
) => {
  const queryResult = useQuery({
    ...config,
    queryKey: ["payment", "id", paymentId],
    queryFn: () => fetchPaymentById(paymentId),
    enabled: config?.enabled ?? !!paymentId,
    select: (res) => res.data,
  });

  return queryResult;
};

export default useGetPayment;
