import React from "react";

import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { fetchPharmaciesByFilter } from "@/client/api/stockService/pharmacyApi";

import { AxiosResponse } from "axios";
import {
  BookmarkRespData,
  OrderRespData,
  PharmacyRespData,
} from "@/client/types/responses/StockResponses";
import { Page } from "@/client/types/responses";
import { PharmacyFilterParams } from "@/client/types/requests/PharmacyRequests";

import { extractParamKey } from "@/util/lib/utils";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { fetchBookmarks } from "@/client/api/stockService/bookmarkApi";
import { BookmarkFilterParams } from "@/client/types/requests/BookmarkRequest";
import { OrderFilterParams } from "@/client/types/requests/paymentRequests";
import { fetchOrdres } from "@/client/api/stockService/orderApi";

export type UserLocation = {
  x: number;
  y: number;
};

const useSearchOrders = (
  searchFilter?: OrderFilterParams,

  config?: UndefinedInitialDataOptions<AxiosResponse<Page<OrderRespData>>>
) => {
  const filter: PharmacyFilterParams = React.useMemo(() => {
    if (searchFilter) return searchFilter;

    return {};
  }, [searchFilter]);

  const searchKey = extractParamKey(filter);

  const queryResult = useQuery({
    ...config,
    queryKey: ["order", searchKey],
    queryFn: () => fetchOrdres(filter),
    select: (res) => res.data,
    placeholderData: (data) => data,
  });

  return queryResult;
};

export default useSearchOrders;
