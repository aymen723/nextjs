import { TagRespData } from "@/client/types/responses/StockResponses";
import { cn } from "@/util/lib/utils";
import React from "react";
import SearchTag from "./SearchTag";

type Props = {
  searchTags: TagRespData[];
  onSelectTag?: (tag: TagRespData) => void;
  display?: boolean;
};

const SearchTagSelector = ({
  searchTags,
  display = true,
  onSelectTag,
}: Props) => {
  return (
    <>
      {display &&
        searchTags.map((tag, i) => {
          return <SearchTag data={tag} onSelect={onSelectTag} key={tag.id} />;
        })}
    </>
  );
};

export default SearchTagSelector;
