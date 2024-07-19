"use client";
import { Page } from "@/client/types/responses";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import { routeToMap } from "@/util/lib/routes/pathManipulation";
import { cn } from "@/util/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const ProductPageLink = ({
  page,
  onClick,
  currentPage,
  isActive = false,
}: {
  page: number;
  onClick: (page: number) => void;
  currentPage?: number;
  isActive?: boolean;
}) => {
  return (
    <PaginationItem>
      <PaginationLink
        onClick={() => onClick(page)}
        className={"text-xs"}
        isActive={isActive}
        size={"sm"}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );
};

type Props = {
  page?: Page<unknown>;
};

const neigborMarg = 2;
const awayMarg = 3;

const ProductsPaginator = ({ page }: Props) => {
  React.useEffect(() => {
    console.log("pagination page", page);
  }, [page]);
  const { searchParams, setSearchQueryValue } = useSearchQueryParams();

  const current = Number.parseInt(searchParams.get("page") ?? "") || 1;
  const next = !!page && !page.last;
  const previous = !!page && !page.first && current !== 1;
  const nextPagesNum = page
    ? Math.max(Math.min(page.totalPages - current, neigborMarg), 0)
    : 0;
  const prevPagesNum = page
    ? Math.max(Math.min(current - 1, neigborMarg), 0)
    : 0;
  const isFirstPageInRange = current - neigborMarg <= 1;
  const isFirstPageAway = current - neigborMarg > 1;
  const isLastPageInRange = page
    ? current + neigborMarg >= page.totalPages
    : true;
  const isLastPageAway = page ? current + 3 < page.totalPages : false;

  const onClickPage = (page: number) => {
    console.log("going to  page", page);
    setSearchQueryValue("page", page);
  };

  return (
    <div>
      <Pagination className="p-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              size={"sm"}
              className={cn({
                "text-muted-foreground hover:text-muted-foreground": !previous,
              })}
              onClick={() => {
                if (previous) onClickPage(current - 1);
              }}
            ></PaginationPrevious>
          </PaginationItem>

          {!isFirstPageInRange && (
            <ProductPageLink page={1} onClick={onClickPage} />
          )}

          {isFirstPageAway && !isLastPageAway && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {new Array(prevPagesNum).fill(0).map((n, i) => {
            const pageNum = current - (prevPagesNum - (i + 1) + 1);
            return (
              <ProductPageLink
                key={pageNum}
                page={pageNum}
                onClick={onClickPage}
              />
            );
          })}
          <ProductPageLink page={current} onClick={() => {}} isActive={true} />
          {new Array(nextPagesNum).fill(0).map((n, i) => {
            const pageNum = current + (i + 1);
            return (
              <ProductPageLink
                key={pageNum}
                page={pageNum}
                onClick={onClickPage}
              />
            );
          })}
          {isLastPageAway && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {!!page && !isLastPageInRange && (
            <ProductPageLink page={page.totalPages} onClick={onClickPage} />
          )}
          <PaginationItem>
            <PaginationNext
              className={cn({
                "text-muted-foreground hover:text-muted-foreground": !next,
              })}
              onClick={() => {
                if (next) onClickPage(current + 1);
              }}
              isActive={next}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductsPaginator;
