import {
  BookmarkRespData,
  ProductRespData,
} from "@/client/types/responses/StockResponses";
import Localiser from "@/components/market/components/Localiser";
import { GeoCoordinates } from "@/types/geoTypes";
import { BookmarkX, ChevronDown, Loader, MapPin } from "lucide-react";
import { motion as m } from "framer-motion";
import React from "react";
import { cn } from "@/lib/util";
import { deleteBookmark } from "@/client/api/stockService/bookmarkApi";
type Props = {
  data: BookmarkRespData;
  onLocate: (location: GeoCoordinates) => void;
  onLocateOne: (Location: GeoCoordinates, prodId: number) => void;
  onProductClick: (productId: number) => void;
  onDelete: () => void;
};
const BookMarkItem = ({
  data: bm,
  onLocate,
  onLocateOne,
  onProductClick,
  onDelete,
}: Props) => {
  const [showDetails, setShowDetails] = React.useState(false);
  return (
    <div>
      <div className="flex h-20 gap-2">
        {bm.registeredProduct ? (
          <img
            src={bm.registeredProduct.picture}
            className="min-w-20 w-20 max-w-20 min-h-full  h-full max-h-full"
          ></img>
        ) : (
          <div className="h-full grid   bg-muted-foreground/10 min-w-20 w-20  grid-cols-2 grid-rows-2">
            {/* <span className="w-20 text-center font-bold text-xl text-white">
              {bm.products?.length}
            </span> */}
            {bm.products?.map((p, i) => {
              if (i >= 4) return null;
              return (
                <img
                  key={p.id}
                  src={p.picture}
                  alt={p.name}
                  className="min-w-full w-full max-w-full min-h-full  h-full max-h-full"
                />
              );
            })}
          </div>
        )}
        <div className="p-1 h-full w-full flex justify-between">
          <div className="flex flex-col justify-between h-full ">
            <div>{bm.name}</div>
            <div>
              <Localiser
                onLocate={onLocate}
                render={(isLocating) => {
                  return (
                    <button className="px-2 py-1 bg-muted-foreground text-white rounded flex items-center gap-2">
                      {!isLocating ? (
                        <MapPin className="size-4" />
                      ) : (
                        <Loader className="size-4 animate-spin" />
                      )}
                      <span className="text-sm"> Localiser</span>
                    </button>
                  );
                }}
              ></Localiser>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              className="hover:bg-red-500/20 p-1 rounded-full"
              onClick={() => {
                onDelete();
              }}
            >
              <BookmarkX className="size-4 text-primary-red hover:scale-110" />
            </button>
            <div>
              {!bm.registeredProduct && (
                <button
                  className="p-1 bg-muted hover:bg-muted-foreground/20"
                  onClick={() => {
                    setShowDetails((old) => !old);
                  }}
                >
                  <ChevronDown
                    className={cn("size-4", {
                      "rotate-180": showDetails,
                    })}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <m.div
        initial={{
          height: "0px",
        }}
        animate={{
          height: showDetails ? "auto" : "0px",
        }}
        className="overflow-hidden  "
      >
        <div className="p-2 flex flex-col gap-2 border-l-4 border-muted-foreground/80 my-2">
          {bm.products?.map((p) => {
            return (
              <div key={p.id} className="flex h-16 gap-2">
                <img
                  src={p.picture}
                  alt={p.name}
                  className="min-w-20 w-20 max-w-20 min-h-full  h-full max-h-full"
                />
                <div className="flex  justify-between p-2 w-full">
                  <button
                    className="hover:underline"
                    onClick={() => onProductClick(p.id)}
                  >
                    {p.name}
                  </button>

                  <Localiser
                    onLocate={(location) => {
                      onLocateOne(location, p.id);
                    }}
                    render={(isLocating) => {
                      return (
                        <button className="flex">
                          {isLocating ? (
                            <Loader className="size-4 animate-spin" />
                          ) : (
                            <MapPin className="size-4 text-primary-green" />
                          )}
                        </button>
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </m.div>
    </div>
  );
};

export default BookMarkItem;
