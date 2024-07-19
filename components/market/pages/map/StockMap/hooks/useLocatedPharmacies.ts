import React from "react";

import { PharmacyFilterParams } from "@/client/types/requests/PharmacyRequests";

import { useSearchQueryParams } from "@/util/contexts/SearchQuery";

import useSearchPharmacies from "@/util/hooks/api/useSearchPharmacies";

export type UserLocation = {
  x: number;
  y: number;
};

const useLocatedPharmacies = (
  userLocation?: UserLocation | undefined | null,
  autoDisable = true
  // config?: UndefinedInitialDataOptions<AxiosResponse<Page<PharmacyRespData>>>
) => {
  const { searchParams, setSearchQueryValue, deleteSearchQuery } =
    useSearchQueryParams();

  const filter: PharmacyFilterParams = React.useMemo(() => {
    return {
      tags: searchParams.getAll("tags"),
      range: Number.parseInt(searchParams.get("range") ?? "") || 1000,
      pageSize: 100,
      x: userLocation?.x,
      y: userLocation?.y,
      products: searchParams.getAll("products"),
    };
  }, [searchParams, userLocation]);

  const {
    pharmaciesPage,
    pharmacies: approximatePharmacies,
    isPharmaciesLoading: isLoading,
  } = useSearchPharmacies(filter, {
    enabled: !!userLocation,

    queryKey: [],
  });

  return {
    approximatePharmacies,
    isLoading,
    filter,
    pharmaciesPage,
  };
};

export default useLocatedPharmacies;
