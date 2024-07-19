import React from "react";

import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { AxiosResponse } from "axios";
import { TagRespData } from "@/client/types/responses/StockResponses";
import { Page } from "@/client/types/responses";

import { extractParamKey } from "@/util/lib/utils";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";

import {
  TagFilterParams,
  fetchTagsByFilter,
} from "@/client/api/stockService/tagApi";

const useSearchTags = (
  searchFilter?: TagFilterParams,

  config?: UndefinedInitialDataOptions<AxiosResponse<Page<TagRespData>>>
) => {
  const filter: TagFilterParams = React.useMemo(() => {
    return searchFilter ?? {};
  }, [searchFilter]);

  const searchKey = React.useMemo(() => {
    return extractParamKey(filter);
  }, [filter]);

  const {
    data: tagsPage,
    isLoading: isTagsLoading,
    isError: isTagsError,
  } = useQuery({
    ...config,
    queryKey: ["tags", searchKey],

    queryFn: () => fetchTagsByFilter(filter),
    select: (res) => res.data,
  });

  return {
    tagsPage,
    isTagsError,
    isTagsLoading,
    filter,
  };
};

export default useSearchTags;
