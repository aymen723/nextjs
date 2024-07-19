import { BookmarkRespData } from "@/client/types/responses/StockResponses";
import Localiser from "@/components/market/components/Localiser";
import { routeToMap, routeToProduct } from "@/util/lib/routes/pathManipulation";
import { BookmarkX, ChevronDown, Loader, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import BookMarkItem from "./BookmarkItem";
import { useQueryClient } from "@tanstack/react-query";
import { deleteBookmark } from "@/client/api/stockService/bookmarkApi";
type Props = {
  data: BookmarkRespData[];
};
const BookMarkList = ({ data }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <div className="flex flex-col gap-2 ">
      {data.map((bm) => {
        return (
          <BookMarkItem
            key={bm.id}
            data={bm}
            onProductClick={(p) => {
              router.push(routeToProduct(p));
            }}
            onLocateOne={(location, prodId) => {
              router.push(
                routeToMap({
                  x: location.x,
                  y: location.y,
                  products: prodId,
                })
              );
            }}
            onLocate={(location) => {
              let products: number[] | number = [];
              if (!!bm.registeredProduct) {
                products = bm.registeredProduct.id;
              } else if (!!bm.products) {
                products = bm.products.map((p) => p.id);
              }

              router.push(
                routeToMap({
                  x: location.x,
                  y: location.y,
                  products: products,
                })
              );
            }}
            onDelete={() => {
              deleteBookmark(bm.id).then((res) => {
                queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
              });
            }}
          />
        );
      })}
    </div>
  );
};

export default BookMarkList;
