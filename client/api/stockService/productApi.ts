import axios, { AxiosRequestConfig } from "axios";
import { STOCK_SERVICE_URL_V1 } from "../../config/settings";
import {
  AvailableStockRespData,
  PharmacyRespData,
  PharmacyUptime,
  ProductRespData,
} from "@/client/types/responses/StockResponses";
import { Filter } from "../../types/requests";
import { Page } from "../../types/responses";
import { prepareSearchParams } from "@/client/util/dataTransformation";
import { ProductFilterParams } from "@/client/types/requests/ProductRequests";

export const fetchProductById = (
  productId: number,
  config?: AxiosRequestConfig
) => {
  return axios<ProductRespData>({
    url: STOCK_SERVICE_URL_V1 + `/medical-products/${productId}`,
    method: "GET",
    ...config,
  });
};

export const fetchProductsByFilter = (
  searchFilter?: Filter<ProductFilterParams>,
  config?: AxiosRequestConfig
) => {
  const params = prepareSearchParams(searchFilter);
  return axios<Page<ProductRespData>>({
    url: STOCK_SERVICE_URL_V1 + `/medical-products`,
    params,
    method: "GET",
    ...config,
  });
};

export const fetchPharmacyUptime = (
  pharmacyId: PharmacyRespData["id"],
  config?: AxiosRequestConfig
) => {
  return axios<PharmacyUptime>({
    url: STOCK_SERVICE_URL_V1 + `/pharmacies/${pharmacyId}/uptimes`,
    method: "GET",
    ...config,
  });
};
