import type { AuthData } from "@/redux/AuthSlice";

export const getLocalAuthState = () => {
  return new Promise<AuthData>((resolve, reject) => {
    const localAuthString = window.localStorage.getItem("authData");
    if (!localAuthString) return reject();

    try {
      const localAuthData = JSON.parse(localAuthString) as AuthData;
      return resolve(localAuthData);
    } catch (e) {
      return reject();
    }
  });
};

export const setLocalAuthState = (data: AuthData) => {
  window.localStorage.setItem("authData", JSON.stringify(data));
  window.localStorage.setItem("app-access-token", data.accessToken.token);
};

export const eraseLocalAuthState = () => {
  window.localStorage.removeItem("authData");
  window.localStorage.removeItem("app-access-token");
};

export const getLocalAccessToken = () => {
  return window.localStorage.getItem("app-access-token");
};
