import { AUTH_SERVICE_URL_V1 } from "@/client/config/settings";
import { CredentialLoginRequest } from "@/client/types/requests/authRequests";
import { LoginResp } from "@/client/types/responses/authResponses";
import axios from "axios";

export const googleAccessAuthentication = (accessToken: string) => {
  return axios<LoginResp>({
    url: `${AUTH_SERVICE_URL_V1}/auth/google`,
    method: "post",
    data: {
      accessToken,
      provider: "GOOGLE",
    },
  });
};

export const googleIdAuthentication = (idToken: string) => {
  return axios<LoginResp>({
    url: `${AUTH_SERVICE_URL_V1}/auth/google`,
    method: "post",
    data: {
      idToken: idToken,
      provider: "GOOGLE",
    },
  });
};

export const credentialAuthentication = (request: CredentialLoginRequest) => {
  return axios<LoginResp>({
    url: `${AUTH_SERVICE_URL_V1}/auth/login`,
    method: "post",
    data: request,
  });
};
