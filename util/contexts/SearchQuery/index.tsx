"use client";
import { setParamValue } from "@/util/lib/searchParamsUtils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type QueryProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type QueryProviderState = {
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
  setSearchParams: (
    newQuery: URLSearchParams | ReadonlyURLSearchParams
  ) => void;
};

const initialState: QueryProviderState = {
  searchParams: new ReadonlyURLSearchParams(new URLSearchParams()),
  pathname: "",
  setSearchParams: () => {},
};

const SearchQueryProviderContext =
  createContext<QueryProviderState>(initialState);

export function SearchQueryProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: QueryProviderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const setSearchParams = React.useCallback(
    (inputQuery: URLSearchParams) => {
      const search = inputQuery.toString();

      const query = search ? `?${search}` : "";
      const newPath = `${pathname}${query}`;
      console.log("new path ::", newPath);

      router.push(newPath);
    },
    [router, pathname]
  );

  const value: QueryProviderState = {
    searchParams: searchParams,
    pathname: pathname,
    setSearchParams: setSearchParams,
  };

  return (
    <SearchQueryProviderContext.Provider {...props} value={value}>
      {children}
    </SearchQueryProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(SearchQueryProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

type QueryValue =
  | string
  | number
  | boolean
  | number[]
  | string[]
  | undefined
  | null;

export const useSearchQueryParams = () => {
  const { searchParams, setSearchParams, pathname } = React.useContext(
    SearchQueryProviderContext
  );

  const [isReady, setIsReady] = React.useState(false);

  const setSearchQueryValues = React.useCallback(
    (record: Record<string, QueryValue>) => {
      let query = new URLSearchParams(searchParams);
      for (let key in record) {
        query = setParamValue(query, key, record[key]);
      }
      setSearchParams(query);
    },
    [searchParams, setSearchParams]
  );

  const setSearchQueryValue = React.useCallback(
    (key: string, value?: QueryValue) => {
      console.log(`setting value {${key} : ${value}}`);
      let query = new URLSearchParams(Array.from(searchParams.entries()));
      query = setParamValue(query, key, value);

      setSearchParams(query);
    },
    [searchParams, setSearchParams]
  );

  const appendSearchQueryValue = React.useCallback(
    (key: string, value?: string | number) => {
      if (value) {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (!current.has(key, value.toString()))
          current.append(key, value.toString());
        setSearchParams(current);
      }
    },
    [searchParams, setSearchParams]
  );

  const deleteSearchQuery = React.useCallback(
    (key: string) => {
      let query = new URLSearchParams(Array.from(searchParams.entries()));
      query.delete(key);
      setSearchParams(query);
    },
    [setSearchParams, searchParams]
  );

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return {
    searchParams,
    pathname,
    setSearchQuery: setSearchParams,
    setSearchQueryValue,
    appendSearchQueryValue,
    deleteSearchQuery,
    setSearchQueryValues,
    isReady,
  };
};
