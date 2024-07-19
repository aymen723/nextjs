import {
  deleteBookmark,
  postBookmark,
} from "@/client/api/stockService/bookmarkApi";
import { ProductRespData } from "@/client/types/responses/StockResponses";
import useSearchBookmarks from "@/util/hooks/api/useSearchBookmarks";
import { useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck } from "lucide-react";
import React from "react";

type Props = {
  product: ProductRespData;
};
const ProductBookmark = ({ product }: Props) => {
  const { data: bookMarksPage } = useSearchBookmarks({
    registeredProd: product.id,
  });
  const isBookMarked = !!bookMarksPage && !bookMarksPage.empty;
  const queryClient = useQueryClient();
  return (
    <button
      disabled={!bookMarksPage}
      onClick={() => {
        console.log("bookmarks", bookMarksPage);
        if (!isBookMarked) {
          postBookmark({
            registeredProd: product.id,
          }).then(() => {
            queryClient.invalidateQueries({
              queryKey: ["bookmarks"],
            });
          });
        } else {
          deleteBookmark(bookMarksPage?.content[0].id ?? 0).then(() => {
            queryClient.invalidateQueries({
              queryKey: ["bookmarks"],
            });
          });
        }
      }}
    >
      {isBookMarked ? (
        <BookmarkCheck className="size-5 text-purple-500" />
      ) : (
        <Bookmark className="size-5" />
      )}
    </button>
  );
};

export default ProductBookmark;
