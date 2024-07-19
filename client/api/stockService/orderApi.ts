import { STOCK_SERVICE_URL_V1 } from "@/client/config/settings";
import { Filter } from "@/client/types/requests";
import { OrderFilterParams } from "@/client/types/requests/paymentRequests";
import { Page } from "@/client/types/responses";
import { OrderRespData } from "@/client/types/responses/StockResponses";
import { prepareSearchParams } from "@/client/util/dataTransformation";
import { getLocalAccessToken } from "@/util/lib/localStateManagement";
import axios, { AxiosRequestConfig } from "axios";

export const fetchOrdres = (
  searchFilter?: Filter<OrderFilterParams>,
  config?: AxiosRequestConfig
) => {
  const params = prepareSearchParams(searchFilter);
  return axios<Page<OrderRespData>>({
    url: STOCK_SERVICE_URL_V1 + `/orders`,
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
      ...config?.headers,
    },
    params,
    method: "GET",
    ...config,
  });
};

export const fetchOrderById = (
  orderId: OrderRespData["id"],
  config?: AxiosRequestConfig
) => {
  return axios<OrderRespData>({
    url: STOCK_SERVICE_URL_V1 + `/orders/${orderId}`,
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
      ...config?.headers,
    },
    method: "GET",
    ...config,
  });
};
