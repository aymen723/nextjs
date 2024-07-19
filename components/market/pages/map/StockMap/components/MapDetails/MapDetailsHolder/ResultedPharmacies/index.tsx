import { PharmacyRespData } from "@/client/types/responses/StockResponses";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brackets, Loader } from "lucide-react";
import React from "react";
import PharmacyDetails from "./PharmacyDetails";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { StockFilterParams } from "@/client/types/requests/StockRequests";
import { useStockMap } from "../../../../context/StockMapContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

const ResultedPharmacies = () => {
  const { pharmaciesPage, range } = useStockMap();
  const pharmacies = pharmaciesPage?.content;
  const { searchParams, setSearchQueryValue } = useSearchQueryParams();
  const stockFilter: StockFilterParams = React.useMemo(() => {
    return {
      tags: searchParams.getAll("tags"),
      products: searchParams.getAll("products"),
      pageSize: 50,
    };
  }, [searchParams]);

  React.useEffect(() => {
    console.log("pharmacies", pharmaciesPage);
  });
  return (
    <>
      {!pharmacies ? (
        <div className="h-full grid place-items-center">
          <Loader className="animate-spin text-primary-green" />
        </div>
      ) : (
        <div className="size-full overflow-hidden">
          {!pharmacies.length ? (
            <div className="size-full grid place-items-center select-none">
              <div className="flex flex-col items-center gap-8">
                <div>
                  <Brackets />
                  <span>vide</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs">
                    voulez-vous modifier la plage de distance?
                  </span>
                  <div>
                    <Select
                      value={range.toString()}
                      onValueChange={(value) => {
                        setSearchQueryValue("range", value);
                      }}
                    >
                      <SelectTrigger className="w-full max-h-8 bg-muted-foreground/30">
                        <SelectValue placeholder="selectioné une protée" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Portée</SelectLabel>
                          <SelectItem value="500">500m</SelectItem>
                          <SelectItem value="1000">1km</SelectItem>
                          <SelectItem value="2000">2km</SelectItem>
                          <SelectItem value="4000">4km</SelectItem>
                          <SelectItem value="6000">6km</SelectItem>
                          <SelectItem value="10000">10km</SelectItem>
                          <SelectItem value="15000">15km</SelectItem>
                          <SelectItem value="30000">30km</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ScrollArea
              // scrollHideDelay={1000}
              className="size-full flex flex-col gap-2 px-1"
            >
              {pharmacies.map((pharmacy) => {
                return (
                  <PharmacyDetails
                    stockFilter={stockFilter}
                    onHover={() => {}}
                    onHoverOut={() => {}}
                    key={pharmacy.id}
                    data={pharmacy}
                    onDetails={(pharmacy) => {
                      setSearchQueryValue("selected-pharmacy", pharmacy.id);
                    }}
                  />
                );
              })}
            </ScrollArea>
          )}
        </div>
      )}
    </>
  );
};

export default ResultedPharmacies;
