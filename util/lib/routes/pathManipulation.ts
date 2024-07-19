import { PharmacyFilterParams } from "@/client/types/requests/PharmacyRequests";
import { appPaths } from "./static";
import { setParamValues } from "../searchParamsUtils";
import { ProductFilterParams } from "@/client/types/requests/ProductRequests";

type MapRouteParams = PharmacyFilterParams | URLSearchParams;

export const routeToMap = (params?: MapRouteParams) => {
  let searchParamsString = "?";
  if (params) {
    let searchParams = new URLSearchParams();
    if (params instanceof URLSearchParams) {
      searchParams = params;
    } else {
      setParamValues(searchParams, params);
    }
    searchParamsString += searchParams.toString();
  }

  return appPaths.market.map + searchParamsString;
};

type ProductsRouteParams = ProductFilterParams | URLSearchParams;

export const routeToProducts = (params?: ProductsRouteParams) => {
  let searchParamsString = "?";
  if (params) {
    let searchParams = new URLSearchParams();
    if (params instanceof URLSearchParams) {
      searchParams = params;
    } else {
      setParamValues(searchParams, params);
    }
    searchParamsString += searchParams.toString();
  }

  return appPaths.market.products + searchParamsString;
};

export const routeToProduct = (productId: number | string) => {
  return appPaths.market.products + `/${productId}`;
};
