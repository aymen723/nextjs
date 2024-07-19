"use client";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/util";
import { useSearchQueryParams } from "@/util/contexts/SearchQuery";
import useGetUserProfile from "@/util/hooks/api/useGetUserProfile";
import useSearchPharmacyStock from "@/util/hooks/api/useSearchPharmacyStock";
import { useAppSelector } from "@/util/hooks/redux";
import { isValid } from "@/util/lib/utils";
import { Brackets, Loader2, Pencil, Pill, Trash } from "lucide-react";
import React from "react";
import PharmacyProduct from "./PharmacyProduct";
import ProductsPaginator from "@/components/market/pages/products/ProductsPaginator";

const PharmacyProductList = () => {
  const { searchParams, setSearchQueryValue } = useSearchQueryParams();

  const authData = useAppSelector((app) => app.auth.authData);
  const { profileData, isLoading: isLoadingProfile } = useGetUserProfile(
    authData?.id ?? 0
  );

  const search = React.useMemo(() => {
    return searchParams.get("search");
  }, [searchParams]);

  const { stockPage, isLoadingStock } = useSearchPharmacyStock(
    profileData?.pharmacy?.id ?? 0,
    {
      pageSize: 10,
      search: search ?? undefined,
      page: searchParams.get("page") ?? "1",
    }
  );

  const [stock, setStock] = React.useState(stockPage?.content ?? []);

  React.useEffect(() => {
    setStock(stockPage?.content ?? []);
    console.log("stock", stockPage?.content);
  }, [stockPage]);
  const isLoading = isLoadingStock || isLoadingProfile;

  React.useEffect(() => {
    setSearchQueryValue("page", "1");
  }, [search]);
  return (
    <div>
      <div className="flex justify-center">
        <ProductsPaginator page={stockPage} />
      </div>

      <div className="p-4 m-4 bg-white/70  rounded shadow flex flex-col ">
        {!isLoading ? (
          !!stock.length ? (
            <>
              <div className="flex  h-8 bg-muted text-xs mb-2">
                <div className="h-full flex items-center">
                  <div className="w-16 pl-4">produit</div>
                </div>
                <div className="w-full p-2 flex items-center justify-between">
                  <div className="w-32 "></div>

                  <div className=" w-10   whitespace-nowrap text-center">
                    affichage
                  </div>
                  <div className=" w-10   whitespace-nowrap text-center">
                    disponibilité
                  </div>
                  <div className=" w-11   whitespace-nowrap text-center">
                    remplacé
                  </div>
                  <div className=" w-11   whitespace-nowrap text-center">
                    remplacé-dispo
                  </div>
                  <div className="rounded-full p-2 hover:bg-red-100 transition-colors opacity-0">
                    <Pill className="size-5 text-primary-green" />
                  </div>
                </div>
              </div>
              {stock.map((s, i) => {
                const isLast = i == stock.length - 1;
                return (
                  <div key={`${s.id.pharmacyId}/${s.id.productId}`}>
                    <PharmacyProduct stock={s} setStock={setStock} />
                    {!isLast && (
                      <div className="h-[1px] bg-muted-foreground/20 my-2"></div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <div className="h-44 grid place-items-center">
              <div className="text-center flex flex-col items-center gap-1">
                <Brackets />
                <span className="text-muted-foreground">vide</span>
              </div>
            </div>
          )
        ) : (
          <div className="h-44 grid place-items-center">
            <Loader2 className="text-primary-green animate-spin size-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyProductList;
