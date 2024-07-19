import { TagRespData } from "@/client/types/responses/StockResponses";
import { cn } from "@/util/lib/utils";
import React from "react";

type Props = {
  data: TagRespData;
  onSelect?: (tag: TagRespData) => void;
};

const SearchTag = ({ data: tag, onSelect }: Props) => {
  return (
    <div
      key={tag.id}
      className={cn(
        "p-2 text-md font-semibold cursor-pointer hover:bg-subtle-light z-30 flex  items-center  gap-4 text-xs",
        {
          "text-primary-red": tag.type.name === "DESCRIBER",
          "text-primary-blue": tag.type.name === "TYPE",
        }
      )}
      onClick={() => {
        onSelect?.(tag);
      }}
    >
      <span className="py-1 px-2 bg-muted text-xs rounded text-muted-foreground">
        Tag
      </span>
      <span>{tag.name}</span>
    </div>
  );
};

export default SearchTag;
