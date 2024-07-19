import { UndefinedInitialDataInfiniteOptions } from "@tanstack/react-query";

export type NonPartial<T> = {
  [K in keyof T]-?: T[K];
};
