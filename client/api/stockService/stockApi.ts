import { Filter } from "@/client/types/requests";

import {
  AvailableStockRespData,
  PharmacyRespData,
  StockId,
} from "@/client/types/responses/StockResponses";
import { Page } from "@/client/types/responses";
import { STOCK_SERVICE_URL_V1 } from "@/client/config/settings";
import axios, {
  Axios,
  AxiosRequestConfig,
  CustomParamsSerializer,
} from "axios";
import { prepareSearchParams } from "@/client/util/dataTransformation";
import {
  StockFilterParams,
  StockUpdateRequest,
} from "@/client/types/requests/StockRequests";
import { getLocalAccessToken } from "@/util/lib/localStateManagement";

export const fetchStockByFilter = (
  searchFilter?: Filter<StockFilterParams>,
  config?: AxiosRequestConfig
) => {
  const params = prepareSearchParams(searchFilter);

  return axios<Page<AvailableStockRespData>>({
    url: STOCK_SERVICE_URL_V1 + "/stock",

    params,
    method: "GET",
    ...config,
  });
};

export const fetchStockById = (id: StockId, config?: AxiosRequestConfig) => {
  return axios<AvailableStockRespData>({
    url: `${STOCK_SERVICE_URL_V1}/stock/${id.pharmacyId}/${id.productId}`,
    method: "GET",

    ...config,
  });
};

export const fetchStockFromPharmacy = (
  pharmacyId: PharmacyRespData["id"],
  searchFilter?: StockFilterParams,
  config?: AxiosRequestConfig
) => {
  const params = prepareSearchParams(searchFilter);

  return axios<Page<AvailableStockRespData>>({
    url: `${STOCK_SERVICE_URL_V1}/pharmacies/${pharmacyId}/stock`,
    params,
    method: "GET",
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
    },
    ...config,
  }).catch((err) => {
    return err;
  });
};

export const updateStockInfo = (
  stockId: StockId,
  request: StockUpdateRequest,
  config?: AxiosRequestConfig
) => {
  return axios<AvailableStockRespData>({
    url: `${STOCK_SERVICE_URL_V1}/pharmacies/${stockId.pharmacyId}/stock/${stockId.productId}`,
    method: "put",
    data: request,
    headers: {
      Authorization: `Bearer ` + getLocalAccessToken(),
      ...config?.headers,
    },
    ...config,
  });
};
