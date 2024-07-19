"use client";

import ProductList from "@/components/market/pages/products/ProductList";
import ProductsPaginator from "@/components/market/pages/products/ProductsPaginator";

import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import useSearchProducts from "@/util/hooks/api/useSearchProducts";

import React from "react";

const ProductsPage = () => {
  const { searchParams } = useSearchQueryParams();
  const { productsPage, isProductsLoading } = useSearchProducts(
    {
      tags: searchParams.getAll("tags"),
      page: searchParams.get("page") ?? 1,
      pageSize: 20,
    },
    { queryKey: [], placeholderData: (data) => data }
  );
  const products = productsPage?.content ?? [];
  return (
    <div className="px-4 pt-4  h-full py-1">
      <div className="flex gap-2 h-full ">
        <div className="flex flex-col w-full ">
          <div className="">
            <ProductsPaginator page={productsPage} />
          </div>

          <ProductList data={products} isLoading={isProductsLoading} />
        </div>

        <div
          className="bg-muted-foreground w-64 rounded"
          style={{
            backgroundImage: `url(https://i.pinimg.com/564x/89/e0/55/89e0559f733ae79476d026edc356cba2.jpg)`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProductsPage;
