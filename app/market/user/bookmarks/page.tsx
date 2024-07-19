"use client";
import Localiser from "@/components/market/components/Localiser";
import BookMarkList from "@/components/market/pages/user/bookmarks/BookmarkList";
import { Input } from "@/components/ui/input";
import useSearchBookmarks from "@/util/hooks/api/useSearchBookmarks";
import { routeToMap } from "@/util/lib/routes/pathManipulation";
import { BookmarkX, ChevronDown, Loader, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BookmarksPage = () => {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const { data: bookmarkPage, isLoading: isLoadingBookmarks } =
    useSearchBookmarks({
      pageSize: 100,
      name: search || undefined,
    });

  React.useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="p-2">
      <div className="w-[40rem]  bg-white  mx-auto mt-12 rounded-t">
        <div className="bg-gray-400/30 h-10 rounded-t flex items-center gap-2 p-2">
          <div>
            <Search className="size-4" />
          </div>
          <input
            className="bg-transparent h-full w-full focus:outline-none"
            placeholder="cherche"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {isLoadingBookmarks ? (
          <div className="h-64 grid place-items-center">
            <Loader className="size-6 animate-spin text-primary-green" />
          </div>
        ) : !!bookmarkPage && !!bookmarkPage.content.length ? (
          <BookMarkList data={bookmarkPage.content} />
        ) : (
          <div className="h-64 grid place-items-center">empty</div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
