import { STOCK_SERVICE_URL_V1 } from "@/client/config/settings";
import { Filter } from "@/client/types/requests";
import {
  BookmarkCreateRequest,
  BookmarkFilterParams,
} from "@/client/types/requests/BookmarkRequest";
import { Page } from "@/client/types/responses";
import { BookmarkRespData } from "@/client/types/responses/StockResponses";
import { prepareSearchParams } from "@/client/util/dataTransformation";
import { getLocalAccessToken } from "@/util/lib/localStateManagement";
import axios, { AxiosRequestConfig } from "axios";

export const fetchBookmarks = (
  searchFilter?: Filter<BookmarkFilterParams>,
  config?: AxiosRequestConfig
) => {
  const params = prepareSearchParams(searchFilter);
  return axios<Page<BookmarkRespData>>({
    url: STOCK_SERVICE_URL_V1 + `/bookmarks`,
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
      ...config?.headers,
    },
    params,
    method: "GET",
    ...config,
  });
};

export const fetchBookmarkById = (
  bookmarkId: BookmarkRespData["id"],
  config?: AxiosRequestConfig
) => {
  return axios<BookmarkRespData>({
    url: STOCK_SERVICE_URL_V1 + `/bookmarks/${bookmarkId}`,
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
      ...config?.headers,
    },
    method: "GET",
    ...config,
  });
};

export const postBookmark = (
  request: BookmarkCreateRequest,
  config?: AxiosRequestConfig
) => {
  return axios<BookmarkRespData>({
    url: STOCK_SERVICE_URL_V1 + "/bookmarks",
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
      ...config?.headers,
    },
    data: request,
    method: "post",
    ...config,
  });
};

export const deleteBookmark = (bookmarkId: number) => {
  return axios({
    url: `${STOCK_SERVICE_URL_V1}/bookmarks/${bookmarkId}`,
    method: "delete",
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
    },
  });
};
