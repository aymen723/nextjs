import { AUTH_SERVICE_URL_V1 } from "@/client/config/settings";
import { UserProfile } from "@/client/types/responses/authResponses";
import { getLocalAccessToken } from "@/util/lib/localStateManagement";
import axios from "axios";

export const fetchAccountProfile = (accountId: number) => {
  return axios<UserProfile>({
    url: `${AUTH_SERVICE_URL_V1}/accounts/${accountId}/profile`,
    method: "get",
    headers: {
      Authorization: `Bearer ` + getLocalAccessToken(),
    },
  });
};

export const changePassword = (pwd: string) => {
  return axios<UserProfile>({
    url: `${AUTH_SERVICE_URL_V1}/accounts/pwd`,
    method: "patch",
    headers: {
      Authorization: `Bearer ` + getLocalAccessToken(),
    },
    data: {
      newPassword: pwd,
    },
  });
};

type lol = Awaited<ReturnType<typeof fetchAccountProfile>>["data"];
