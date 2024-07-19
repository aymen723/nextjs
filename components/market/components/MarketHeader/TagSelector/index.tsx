"use client";

import { TagRespData } from "@/client/types/responses/StockResponses";
import { Plus, Search, X } from "lucide-react";
import React from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { cn } from "@/util/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSelectTags from "@/util/hooks/search/useSelectTags";
import SearchTagSelector from "@/components/market/components/MarketHeader/TagSelector/SearchTagSelector";
type Props = {
  selectedTagsData: TagRespData[];
  onTagClick?: (tag: TagRespData) => any;
  onSelectSearchTag?: (tag: TagRespData) => any;
  onSelectedTagsChange: (selectedTags: TagRespData[]) => void;
  onCloseTag?: (tag: TagRespData) => any;
};
const TagSelector = ({
  onTagClick,

  onSelectedTagsChange,
}: Props) => {
  const [search, setSearch] = React.useState("");

  const {
    selectedTagsData,
    setSelectedTagsData,

    searchTags,
    isLoadingSearchTags,
  } = useSelectTags(search);

  React.useEffect(() => {
    onSelectedTagsChange(selectedTagsData);
  }, [selectedTagsData, searchTags]);

  const onCloseTag = (tag: TagRespData) => {
    setSelectedTagsData((old) => old.filter((t) => t.id !== tag.id));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative">
          {!!selectedTagsData.length && (
            <div className="flex px-2 py-1 text-xs text-primary-light w-fit whitespace-nowrap bg-muted-foreground rounded-md">
              {selectedTagsData.length} tag
              {selectedTagsData.length > 1 ? "s" : null}
            </div>
          )}

          {!selectedTagsData.length && (
            <div className="p-1 rounded-full bg-muted-foreground ">
              <Plus className="text-primary-light w-3 h-3" />
            </div>
          )}

          <div className="absolute top-full"></div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="">
        <div className="">
          {/* <div className="flex gap-1">
            <Search className="w-2 h-2" />{" "}
            <input type="text" className="w-full" placeholder="search tag" />
          </div> */}

          <div className=" bg-muted mb-2 px-2 relative ">
            <input
              className="w-full bg-transparent hover:outline-none focus:outline-none text-xs"
              placeholder="chercher des tags"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <div className="absolute left-0 right-0 top-[105%] h-fit   flex-col gap-1 bg-basic-main rounded-b-md shadow-md z-10">
              <SearchTagSelector
                searchTags={searchTags}
                onSelectTag={(tag) => {
                  setSelectedTagsData((old) => {
                    if (old.find((tg) => tg.id === tag.id)) return old;
                    return [...old, tag];
                  });
                  setSearch("");

                  // setSearchQueryValue("search", "");
                }}
                display={!!search}
              />
            </div>
          </div>

          {!selectedTagsData.length ? (
            <div className="text-center text-sm text-muted-foreground p-4">
              no tags
            </div>
          ) : (
            <m.div className={"flex gap-2  flex-wrap"}>
              {selectedTagsData.map((tag) => {
                return (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      x: -100,
                    }}
                    key={tag.id}
                    className={cn(
                      "p-1  rounded-md border  cursor-pointer flex gap-1 items-center text-xs bg-muted",
                      {
                        "text-primary-light": tag.type.name === "DESCRIBER",
                        "text-yellow-400": tag.type.name === "TYPE",
                      }
                    )}
                    onClick={() => {
                      onCloseTag(tag);
                    }}
                  >
                    <span> {tag.name}</span>
                    <X
                      className="w-3 h-3 text-red-400"
                      onClick={(e) => {
                        if (onCloseTag) {
                          e.stopPropagation();
                          onCloseTag(tag);
                        }
                      }}
                    />
                  </m.div>
                );
              })}
            </m.div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TagSelector;
