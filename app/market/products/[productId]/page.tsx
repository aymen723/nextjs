import { STOCK_SERVICE_URL_V1 } from "@/client/config/settings";
import { ProductRespData } from "@/client/types/responses/StockResponses";
import Localiser from "@/components/market/components/Localiser";
import DetailedProduct from "@/components/market/pages/products/DetailedProduct";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/util/lib/utils";
import { LocateFixedIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

const getProduct = async (productId: string) => {
  const result = await fetch(
    `${STOCK_SERVICE_URL_V1}/medical-products/${productId}`,
    {
      next: {
        revalidate: 1000,
      },
    }
  );
  if (!result.ok) throw new Error(`cant fetch product id = ${productId}`);
  const data = (await result.json()) as ProductRespData;

  return data;
};

type PageProps = {
  params: {
    productId: string;
  };
};

const ProductDetails = async ({ params: { productId } }: PageProps) => {
  const product = await getProduct(productId);

  return (
    <div>
      <DetailedProduct data={product} />
    </div>
  );
};

export default ProductDetails;
