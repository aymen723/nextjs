import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { ListCollapse } from "lucide-react";
import React from "react";
import FilterMarker from "./FilterMarker";
import FilterHolder from "./FilterHolder";
import useSearchProducts from "@/util/hooks/api/useSearchProducts";
import { useStockMap } from "../../context/StockMapContext";

const FilterDetails = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { searchParams } = useSearchQueryParams();
  const { filterProducts, isLoadingFilterProducts } = useStockMap();

  return (
    <div className="relative">
      <FilterMarker
        products={filterProducts}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <FilterHolder
        products={filterProducts}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default FilterDetails;
