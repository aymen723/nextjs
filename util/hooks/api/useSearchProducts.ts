import React from "react";
import useSelectTags from "../search/useSelectTags";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { AxiosResponse } from "axios";
import {
  PharmacyRespData,
  ProductRespData,
} from "@/client/types/responses/StockResponses";
import { Page } from "@/client/types/responses";
import { PharmacyFilterParams } from "@/client/types/requests/PharmacyRequests";

import { extractParamKey } from "@/util/lib/utils";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { ProductFilterParams } from "@/client/types/requests/ProductRequests";
import { fetchProductsByFilter } from "@/client/api/stockService/productApi";

const useSearchProducts = (
  searchFilter?: ProductFilterParams,

  config?: UndefinedInitialDataOptions<AxiosResponse<Page<ProductRespData>>>
) => {
  const filter: PharmacyFilterParams = React.useMemo(() => {
    if (searchFilter) return searchFilter;

    return {};
  }, [searchFilter]);

  const searchKey = React.useMemo(() => {
    return extractParamKey(filter);
  }, [filter]);

  const {
    data: productsPage,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    ...config,
    queryKey: ["products", searchKey],

    queryFn: () => fetchProductsByFilter(searchFilter),
    select: (res) => res.data,
  });

  return {
    productsPage,
    isProductsError,
    isProductsLoading,
    filter,
  };
};

export default useSearchProducts;
