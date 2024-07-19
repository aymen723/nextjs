import { fetchStockFromPharmacy } from "@/client/api/stockService/stockApi";
import { StockFilterParams } from "@/client/types/requests/StockRequests";
import { Page } from "@/client/types/responses";
import { AvailableStockRespData } from "@/client/types/responses/StockResponses";
import { extractParamKey } from "@/util/lib/utils";
import { NonPartial } from "@/types/utilityTypes";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";

import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { useMemo } from "react";

const useSearchPharmacyStock = (
  pharmacyId: number,
  searchFilter?: StockFilterParams,
  config?: UndefinedInitialDataOptions<
    AxiosResponse<Page<AvailableStockRespData>>
  >
) => {
  const filter: StockFilterParams = React.useMemo(() => {
    if (searchFilter) return searchFilter;
    return {};
  }, [searchFilter]);

  const searchKey = React.useMemo(() => extractParamKey(filter), [filter]);

  const {
    data: stockPage,
    isLoading: isLoadingStock,
    isError: isErrorStock,
  } = useQuery({
    ...config,
    queryKey: ["stock", "pharmacy", pharmacyId, searchKey],
    queryFn: () => {
      return fetchStockFromPharmacy(pharmacyId, {
        ...filter,
      });
    },
    select: (res) => res.data,
    enabled: config?.enabled ?? !!pharmacyId,
  });

  return { stockPage, isLoadingStock, isErrorStock };
};

export default useSearchPharmacyStock;
