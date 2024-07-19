import React from "react";
import useSelectTags from "../search/useSelectTags";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { fetchPharmaciesByFilter } from "@/client/api/stockService/pharmacyApi";

import { AxiosResponse } from "axios";
import { PharmacyRespData } from "@/client/types/responses/StockResponses";
import { Page } from "@/client/types/responses";
import { PharmacyFilterParams } from "@/client/types/requests/PharmacyRequests";

import { extractParamKey } from "@/util/lib/utils";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";

export type UserLocation = {
  x: number;
  y: number;
};

const useSearchPharmacies = (
  searchFilter?: PharmacyFilterParams,

  config?: UndefinedInitialDataOptions<AxiosResponse<Page<PharmacyRespData>>>
) => {
  const filter: PharmacyFilterParams = React.useMemo(() => {
    if (searchFilter) return searchFilter;

    return {};
  }, [searchFilter]);

  const searchKey = extractParamKey(filter);

  const {
    data: pharmaciesPage,
    isLoading: isPharmaciesLoading,
    isError: isPharmaciesError,
  } = useQuery({
    ...config,
    queryKey: ["pharmacies", searchKey],
    queryFn: () => fetchPharmaciesByFilter(filter),
    select: (res) => res.data,
    placeholderData: (data) => data,
  });

  return {
    pharmacies: pharmaciesPage?.content,
    pharmaciesPage,
    isPharmaciesError,
    isPharmaciesLoading,
    filter,
  };
};

export default useSearchPharmacies;
