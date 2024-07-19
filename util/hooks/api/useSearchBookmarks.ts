import React from "react";
import useSelectTags from "../search/useSelectTags";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { fetchPharmaciesByFilter } from "@/client/api/stockService/pharmacyApi";

import { AxiosResponse } from "axios";
import {
  BookmarkRespData,
  PharmacyRespData,
} from "@/client/types/responses/StockResponses";
import { Page } from "@/client/types/responses";
import { PharmacyFilterParams } from "@/client/types/requests/PharmacyRequests";

import { extractParamKey } from "@/util/lib/utils";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { BookmarkFilterParams } from "@/client/types/requests/BookmarkRequest";
import { fetchBookmarks } from "@/client/api/stockService/bookmarkApi";

export type UserLocation = {
  x: number;
  y: number;
};

const useSearchBookmarks = (
  searchFilter?: BookmarkFilterParams,

  config?: UndefinedInitialDataOptions<AxiosResponse<Page<BookmarkRespData>>>
) => {
  const filter: BookmarkFilterParams = React.useMemo(() => {
    if (searchFilter) return searchFilter;

    return {};
  }, [searchFilter]);

  const searchKey = extractParamKey(filter);

  const queryResult = useQuery({
    ...config,
    queryKey: ["bookmarks", searchKey],
    queryFn: () => fetchBookmarks(filter),
    select: (res) => res.data,
    placeholderData: (data) => data,
  });

  return queryResult;
};

export default useSearchBookmarks;
