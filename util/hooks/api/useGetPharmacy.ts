import { fetchPharmacyById } from "@/client/api/stockService/pharmacyApi";
import { PharmacyRespData } from "@/client/types/responses/StockResponses";

import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

const useGetPharmacy = (
  pharmacyId: PharmacyRespData["id"],
  config?: UndefinedInitialDataOptions<AxiosResponse<PharmacyRespData>>
) => {
  const {
    data: pharmacyData,
    isLoading,
    isError,
  } = useQuery({
    ...config,
    queryKey: ["pharmacy", "id", pharmacyId],
    queryFn: () => fetchPharmacyById(pharmacyId),
    enabled: config?.enabled ?? !!pharmacyId,
    select: (res) => res.data,
  });

  return { pharmacyData, isLoading, isError };
};

export default useGetPharmacy;
