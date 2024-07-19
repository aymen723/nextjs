import { fetchTagsByFilter } from "@/client/api/stockService/tagApi";
import { TagRespData } from "@/client/types/responses/StockResponses";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSearchTags from "../api/useSearchTags";

function useSelectTags(search: string = "") {
  const { searchParams, setSearchQueryValue, isReady } = useSearchQueryParams();
  const [missingTagIds, setMissingTagIds] = React.useState<string[]>([]);
  const tagSearch = React.useMemo(() => {
    return search.trim().replace(" ", "-").toLowerCase();
  }, [search]);
  const [selectedTagsData, setSelectedTagsData] = React.useState<TagRespData[]>(
    []
  );
  const { tagsPage, isTagsLoading } = useSearchTags(
    { name: tagSearch },
    {
      queryKey: [],
      enabled: !!search,
      placeholderData: (data) => data,
    }
  );

  const searchTags = React.useMemo(() => {
    return tagsPage?.content ?? [];
  }, [tagsPage]);

  const { tagsPage: missingTagsPage } = useSearchTags(
    {
      ids: missingTagIds,
    },
    {
      queryKey: [],
      enabled: !!missingTagIds.length,
    }
  );

  const missingTagsData = React.useMemo(() => {
    return missingTagsPage?.content ?? [];
  }, [missingTagsPage]);
  // }) useQuery({
  //   queryKey: ["tags", "ids=" + missignTagsIdsKey + "pageSize=100"],
  //   queryFn: ({}) => fetchTagsByFilter({ ids: missingTagIds }),
  //   select: (res) => res.data.content,
  //   enabled: !!missingTagIds.length,
  //   refetchInterval: false,
  // });

  React.useEffect(() => {
    const tagIds = searchParams.getAll("tags");

    if (missingTagsData) {
      if (missingTagsData.length) {
        setSelectedTagsData((old) => [...old, ...missingTagsData]);
      } else {
        setSearchQueryValue(
          "tags",
          tagIds.filter((id) => !missingTagIds.includes(id))
        );
      }
    }
  }, [missingTagsData]);

  React.useEffect(() => {
    const tags = searchParams.getAll("tags");
    const missingtags = tags.filter(
      (tagid) => !selectedTagsData.find((tag) => tag.id.toString() == tagid)
    );
    setMissingTagIds(missingtags);
  }, [searchParams]);

  return {
    selectedTagsData,
    setSelectedTagsData,

    searchTags,
    isLoadingSearchTags: isTagsLoading,
    tagSearch,
  };
}

export default useSelectTags;
