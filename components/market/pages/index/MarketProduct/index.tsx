import { ProductRespData } from "@/client/types/responses/StockResponses";
import Localiser from "@/components/market/components/Localiser";
import { GeoCoordinates } from "@/types/geoTypes";
import { routeToProduct } from "@/util/lib/routes/pathManipulation";
import { Loader, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  data: ProductRespData;
  onLocate: (location: GeoCoordinates) => void;
};

const MarketProduct = ({ data, onLocate }: Props) => {
  return (
    <div
      key={data.id}
      className="w-72 h-64 shadow-md rounded-md flex flex-col p-4 bg-background"
    >
      <div className="flex h-[80%] gap-2">
        <div className="w-[50%]">
          <img
            src={data.picture}
            alt={`product : ${data.name}`}
            className="min-h-full min-w-full max-h-full max-w-full"
          />
        </div>

        <div className="flex flex-col gap-2 w-[50%] ">
          <Link href={routeToProduct(data.id)}>
            <div className="text-center text-base hover:underline">
              {data.name}
            </div>{" "}
          </Link>
          <div className="text text-[0.6rem] text-muted-foreground  overflow-hidden">
            {data.description}
          </div>
        </div>
      </div>
      <div className="h-[20%] flex items-end justify-between ">
        <div className="text-sm text-primary-green">{data.price} Dzd</div>

        <Localiser
          onLocate={onLocate}
          render={(isLocating) => {
            return (
              <button className="text-sm px-2 py-1 bg-primary-green text-white rounded flex gap-1 shadow">
                <span>localiser</span>
                {isLocating ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <MapPin className="size-5" />
                )}
              </button>
            );
          }}
        />
      </div>
    </div>
  );
};

export default MarketProduct;
