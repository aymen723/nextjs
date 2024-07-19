"use client";

import PharmacyProductList from "@/components/pharmacy/components/pages/stock/components/PharmacyProductList";
import PharmacyProductSearcher from "@/components/pharmacy/components/pages/stock/components/PharmacyProductSearcher";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/util";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import useGetUserProfile from "@/util/hooks/api/useGetUserProfile";
import useSearchPharmacyStock from "@/util/hooks/api/useSearchPharmacyStock";
import { useAppSelector } from "@/util/hooks/redux";
import { isValid, throttle } from "@/util/lib/utils";
import {
  Loader,
  Loader2,
  Search,
  Trash,
  Brackets,
  Pill,
  Pencil,
} from "lucide-react";
import React, { useEffect } from "react";

const greet = (hello: string, bye: string) => {
  return console.log("greeting :: ", hello, bye);
};

const throttledGreet = throttle(greet);

const PharmacyStockPage = () => {
  return (
    <div className="p-4  ">
      <div className="p-2 m-2">
        
        <PharmacyProductSearcher />
      </div>
      <PharmacyProductList />
    </div>
  );
};

export default PharmacyStockPage;
