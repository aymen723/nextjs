import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PharamcyStockLoader = () => {
  return (
    <div>
      <Skeleton className="h-36" />
      <div className="flex flex-col gap-4 p-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    </div>
  );
};

export default PharamcyStockLoader;
