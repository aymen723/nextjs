import { isValid } from "./utils";
type SearchParamSingleValue = string | number | boolean | undefined | null;
type SearchParamValue = SearchParamSingleValue | number[] | string[];

export const isSearchParamValid = (value: SearchParamValue) => {
  if (typeof value === "number") return isValid(value);
  if (Array.isArray(value)) return !!value && !!value.length;
  return !!value;
};
export const setParamValue = (
  searchParams: URLSearchParams,
  key: string,
  value: SearchParamValue
) => {
  searchParams.delete(key);
  if (!isSearchParamValid(value)) {
    return searchParams;
  } else if (Array.isArray(value)) {
    for (let val of value) {
      if (val) searchParams.append(key, val.toString());
    }
  } else {
    searchParams.set(key, value?.toString() ?? "");
  }
  return searchParams;
};

export const appendParamValue = (
  searchParams: URLSearchParams,
  key: string,
  value: SearchParamSingleValue
) => {
  if (!isSearchParamValid(value)) {
    return searchParams;
  }
  searchParams.append(key, value?.toString() ?? "");

  return searchParams;
};

export const setParamValues = (
  searchParams: URLSearchParams,
  values: Record<string, SearchParamValue>
) => {
  for (const key in values) {
    setParamValue(searchParams, key, values[key]);
  }

  return searchParams;
};
