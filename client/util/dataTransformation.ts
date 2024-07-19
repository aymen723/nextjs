import { Filter } from "../types/requests";

export function prepareSearchParams(filter: Filter | undefined) {
  if (!filter) return filter;
  const newFitler: Record<any, any> = {};
  for (let key in filter) {
    if (Array.isArray(filter[key])) {
      newFitler[key] = filter[key].join(",");
    } else {
      newFitler[key] = filter[key];
    }
  }

  return newFitler;
}
