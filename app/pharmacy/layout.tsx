"use client";
import ScreenLoader from "@/components/ScreenLoader";
import PharmacyHeader from "@/components/pharmacy/components/PharmacyHeader";
import PharmacyNavigation from "@/components/pharmacy/components/PharmacyNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { useAppSelector } from "@/util/hooks/redux";

import { Pill } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
type Props = {
  children: React.ReactNode;
};
const PharmacyLayout = ({ children }: Props) => {
  const router = useRouter();
  const authData = useAppSelector((app) => app.auth.authData);
  const isAuthValidated = useAppSelector((app) => app.auth.isValidated);
  const loadComponent = !!authData && authData.role === "PHARMACY";

  React.useEffect(() => {
    if (!loadComponent && isAuthValidated) {
      router.push("/");
    }
  });
  return (
    <>
      {!loadComponent ? (
        <ScreenLoader />
      ) : (
        <div className="flex h-screen w-full bg-muted/70">
          <PharmacyNavigation />
          <div className="w-full h-full flex flex-col">
            <PharmacyHeader />

            <ScrollArea className="h-full max-h-full ">{children}</ScrollArea>
            <Toaster
              toastOptions={{
                duration: 2000,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PharmacyLayout;
