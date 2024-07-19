import axios, { AxiosRequestConfig } from "axios";
import { STOCK_SERVICE_URL_V1 } from "../../config/settings";
import type {
  TagRespData,
  TagTypeRespData,
} from "../../types/responses/StockResponses";
import type { Page } from "../../types/responses";
import { Filter } from "@/client/types/requests";
import { prepareSearchParams } from "@/client/util/dataTransformation";

export type TagFilterParams = {
  ids?: number[] | string[] | number | string;
  name?: string;
  page?: number | string;
  pageSize?: number | string;
};

export const fetchTagsByFilter = (
  filter?: Filter<TagFilterParams>,
  config?: AxiosRequestConfig
) => {
  const params = prepareSearchParams(filter);
  return axios<Page<TagRespData>>({
    url: `${STOCK_SERVICE_URL_V1}/product-tags`,
    params,
    method: "GET",
    ...config,
  });
};

export const fetchTagById = (
  id: TagTypeRespData["id"],
  config?: AxiosRequestConfig
) => {
  return axios<TagRespData>({
    url: `${STOCK_SERVICE_URL_V1}/product-tags/${id}`,

    method: "GET",
    ...config,
  });
};
