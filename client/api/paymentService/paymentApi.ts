import { PAYMENT_SERVICE_URL_V1 } from "@/client/config/settings";
import { PaymentCreationRequest } from "@/client/types/requests/paymentRequests";
import { OrderRespData } from "@/client/types/responses/StockResponses";
import { PaymentRespData } from "@/client/types/responses/paimentResponses";
import { getLocalAccessToken } from "@/util/lib/localStateManagement";
import axios, { AxiosRequestConfig } from "axios";

export const postPayment = (
  request: PaymentCreationRequest,
  config?: AxiosRequestConfig
) => {
  return axios<PaymentRespData>({
    url: PAYMENT_SERVICE_URL_V1 + "/payment",
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
      ...config?.headers,
    },
    data: request,
    method: "post",
    ...config,
  });
};

export const fetchPaymentById = (
  paymentId: PaymentRespData["paymentId"],
  config?: AxiosRequestConfig
) => {
  return axios<PaymentRespData>({
    url: PAYMENT_SERVICE_URL_V1 + `/payment/${paymentId}`,
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
      ...config?.headers,
    },
    method: "GET",
    ...config,
  });
};
