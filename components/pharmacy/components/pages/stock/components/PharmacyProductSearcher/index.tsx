import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import useSearchProducts from "@/util/hooks/api/useSearchProducts";
import { throttle } from "@/util/lib/utils";
import { Search } from "lucide-react";
import React from "react";

const PharmacyProductSearcher = () => {
  const { searchParams, setSearchQueryValue } = useSearchQueryParams();
  const [search, setSearch] = React.useState(searchParams.get("search") ?? "");

  const setSearchValue = React.useMemo(() => {
    return throttle((value: string) => {
      setSearchQueryValue("search", value);
    });
  }, [setSearchQueryValue]);

  React.useEffect(() => {
    setSearchValue(search);
  }, [search, setSearchValue]);

  return (
    <div className="flex justify-center">
      <div className=" w-[20rem] py-2 px-4 bg-white/70 shadow rounded">
        <div className="p-1 bg-muted flex items-center gap-2 rounded">
          <Search className="size-4 text-muted-foreground" />
          <input
            type="text"
            className="bg-transparent w-full focus:outline-none"
            placeholder="cherche"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PharmacyProductSearcher;
