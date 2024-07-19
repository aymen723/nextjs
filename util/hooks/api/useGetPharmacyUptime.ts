import {
  fetchPharmacyById,
  fetchPharmacyUptime,
} from "@/client/api/stockService/pharmacyApi";
import {
  PharmacyRespData,
  PharmacyUptime,
} from "@/client/types/responses/StockResponses";

import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

const useGetPharmacyUptime = (
  pharmacyId: PharmacyRespData["id"],
  config?: UndefinedInitialDataOptions<AxiosResponse<PharmacyUptime>>
) => {
  const {
    data: pharmacyUptime,
    isLoading,
    isError,
  } = useQuery({
    ...config,
    queryKey: ["pharmacy", "uptime", "id", pharmacyId],
    queryFn: () => fetchPharmacyUptime(pharmacyId),
    enabled: config?.enabled ?? !!pharmacyId,
    select: (res) => res.data,
  });

  return { pharmacyUptime, isLoading, isError };
};

export default useGetPharmacyUptime;
