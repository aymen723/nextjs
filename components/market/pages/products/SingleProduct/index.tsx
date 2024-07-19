"use client";

import { ProductRespData } from "@/client/types/responses/StockResponses";
import Localiser from "@/components/market/components/Localiser";
import { GeoCoordinates } from "@/types/geoTypes";
import { routeToMap } from "@/util/lib/routes/pathManipulation";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loader2, MapPin, MapPinned } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  data: ProductRespData;
  onLocate: (location: GeoCoordinates) => void;
};

const SingleProduct = ({ data: prod, onLocate }: Props) => {
  return (
    <div className="flex gap-1 min-h-32 h-32 ">
      <div className="w-40">
        <img
          src={prod.picture}
          alt={prod.name}
          className="size-full max-h-full max-w-full"
        />
      </div>

      <div className="p-2 w-full max-h-full overflow-hidden overflow-ellipsis">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-primary-green hover:underline">
            <Link href={`/market/products/${prod.id}`}>{prod.name}</Link>
          </h3>
          <button className="p-1 rounded hover:bg-muted">
            <Link
              href={routeToMap({
                products: [prod.id],
              })}
            >
              <Localiser
                render={(isLocating) => {
                  return isLocating ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <MapPin className="text-primary-green size-5" />
                  );
                }}
                onLocate={onLocate}
              />
            </Link>
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {prod.tags.map((tag) => (
            <Link key={tag.id} href={`/market/products?tags=${tag.id}`}>
              <div className="p-1 bg-muted rounded text-xs hover:bg-muted-foreground/30 ">
                {tag.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex">
          <div>
            <div className="text-primary-green font-semibold mt-4 text-sm whitespace-nowrap">
              {prod.price} Dzd
            </div>
          </div>
          <div className="p-4 text-xs text-muted-foreground overflow-ellipsis">
            {prod.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
