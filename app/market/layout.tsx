import MarketHeader from "@/components/market/components/MarketHeader";
import MarketNavigation from "@/components/market/components/MarketNavigation";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metaData: Metadata = {
  title: "Market title",
  description: "a market of medical products",
};

const MarketLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex h-screen">
        <MarketNavigation />
        <div className="flex flex-col flex-1 ">
          <MarketHeader />
          <main className="flex-1 flex bg-subtle-light overflow-auto z-10">
            <div className="flex-1">{children}</div>
            <Toaster />
            {/* <div className="w-[20rem] bg-white"></div> */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MarketLayout;
