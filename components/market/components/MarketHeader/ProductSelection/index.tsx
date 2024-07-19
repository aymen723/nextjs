import { ProductRespData } from "@/client/types/responses/StockResponses";
import useSearchProducts from "@/util/hooks/api/useSearchProducts";
import React from "react";
import SearchProduct from "./SearchProduct";

type Props = {
  data: ProductRespData[];
  onProdSelect?: (prod: ProductRespData) => void;
  onProdAdd?: (prod: ProductRespData) => void;
};

const ProductSelection = ({
  data: products,
  onProdSelect,
  onProdAdd,
}: Props) => {
  return (
    <>
      {products.map((prod) => {
        return (
          <SearchProduct
            data={prod}
            key={prod.id}
            onSelect={onProdSelect}
            onAdd={onProdAdd}
          />
        );
      })}
    </>
  );
};

export default ProductSelection;
