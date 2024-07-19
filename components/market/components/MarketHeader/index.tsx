"use client";
import React from "react";

import { Search, Loader2 } from "lucide-react";
import clsx from "clsx";
import { FaGoogle } from "react-icons/fa";

import { TagRespData } from "@/client/types/responses/StockResponses";

import useSelectTags from "@/util/hooks/search/useSelectTags";
import TagSelector from "@/components/market/components/MarketHeader/TagSelector";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { useParams, usePathname, useRouter } from "next/navigation";
import SearchTagSelector from "./TagSelector/SearchTagSelector";
import useSearchProducts from "@/util/hooks/api/useSearchProducts";
import ProductSelection from "./ProductSelection";
import { ScrollArea } from "@/components/ui/scroll-area";
import MLoginButton from "./MLoginButton";
import { useAppSelector } from "@/util/hooks/redux";
import UserAvatar from "./UserAvatar";

const searchablePaths = { products: "/market/products", map: "/market/map" };

const searchablePathValues = Object.values(searchablePaths);

const MarketHeader = () => {
  const { productId, pharmacyId } = useParams();
  React.useEffect(() => {
    console.log("header productId", productId);
  }, [productId]);
  const {
    searchParams,
    setSearchQuery,
    setSearchQueryValue,
    appendSearchQueryValue,
    setSearchQueryValues,
  } = useSearchQueryParams();
  const [search, setSearch] = React.useState("");
  const [selectedTagsData, setSelectedTagsData] = React.useState<TagRespData[]>(
    []
  );

  const authData = useAppSelector((app) => app.auth.authData);

  const isAuthenticated = !!authData;

  const { productsPage, isProductsLoading } = useSearchProducts(
    { search, tags: selectedTagsData.map((t) => t.id) },
    { queryKey: [], enabled: !!search || !!selectedTagsData.length }
  );
  const searchProducts = React.useMemo(
    () => productsPage?.content ?? [],
    [productsPage]
  );

  const products = React.useMemo(
    () => searchParams.getAll("products"),
    [searchParams]
  );
  const pathname = usePathname();

  const router = useRouter();

  return (
    <header className="h-20 flex p-4 shadow-md  z-40 relative justify-between items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!searchablePathValues.includes(pathname)) {
            const newSearchParams = new URLSearchParams();
            for (const tag of selectedTagsData) {
              newSearchParams.append("tags", tag.id.toString());
            }
            router.push(`/market/products?${newSearchParams.toString()}`);
          } else {
            setSearchQueryValues({
              enabled: "true",
              tags: selectedTagsData.map((tag) => tag.id),
              products: [],
            });
          }
        }}
        className="flex gap-4 items-center"
      >
        <div className="flex gap-2  items-center bg-subtle-light p-2 rounded-lg h-fit text-xs w-[20rem] relative group focus-within:outline ">
          {!isProductsLoading ? (
            <button type="submit">
              <Search className="h-5 w-5" />
            </button>
          ) : (
            <Loader2 className="h-5 w-5 animate-spin" />
          )}

          <input
            type="text"
            placeholder="search medicine"
            className="focus:outline-none bg-inherit w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <div className="hidden absolute left-0 right-0 top-[105%] h-fit max-h-64 group-focus-within:flex  hover:block bg-basic-main rounded-b-md shadow-md z-10">
            <ScrollArea className="max-h-64 overflow-auto w-full flex flex-col gap-1 ">
              <ProductSelection
                data={searchProducts}
                onProdAdd={(prod) => {
                  if (
                    searchablePathValues.includes(pathname) &&
                    !products.includes(prod.id.toString())
                  ) {
                    appendSearchQueryValue("products", prod.id);
                  }
                }}
                onProdSelect={(prod) => {
                  console.log("selecting");

                  if (searchablePaths.map === pathname) {
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.delete("products");
                    newSearchParams.delete("tags");

                    newSearchParams.set("products", prod.id.toString());

                    router.push(pathname + `?${newSearchParams.toString()}`);
                    return;
                  } else {
                    router.push(searchablePaths.products + `/${prod.id}`);
                  }

                  setSearch("");
                }}
              />
            </ScrollArea>
          </div>
          <TagSelector
            selectedTagsData={selectedTagsData}
            onTagClick={(tag) => {
              setSelectedTagsData((old) => {
                return old.filter((d) => d.id !== tag.id);
              });
            }}
            onSelectedTagsChange={(selectedTags) =>
              setSelectedTagsData(selectedTags)
            }
          />
        </div>
        <button className="bg-muted-foreground text-primary-foreground px-2 py-1 rounded-sm text-sm hover:opacity-90  shadow-sm">
          Cherche
        </button>
      </form>

      <div>{isAuthenticated ? <UserAvatar /> : <MLoginButton />}</div>
    </header>
  );
};

export default MarketHeader;
