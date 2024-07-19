import { fetchAccountProfile } from "@/client/api/authService/accountApi";
import { fetchPharmacyById } from "@/client/api/stockService/pharmacyApi";

import { UserProfile } from "@/client/types/responses/authResponses";

import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

const useGetUserProfile = (
  AccountId: UserProfile["id"],
  config?: UndefinedInitialDataOptions<AxiosResponse<UserProfile>>
) => {
  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    ...config,
    queryKey: ["profile", "id", AccountId],
    queryFn: () => fetchAccountProfile(AccountId),
    enabled: config?.enabled ?? !!AccountId,
    select: (res) => res.data,
    placeholderData: (data) => data,
  });

  return { profileData, isLoading, isError };
};

export default useGetUserProfile;
