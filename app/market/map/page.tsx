"use client";

import StockMap from "@/components/market/pages/map/StockMap";
import React from "react";

const MapPage = () => {
  return (
    <div className="h-full min-h-full max-w-full overflow-x-hidden">
      {/* <h2>Products</h2>
      <MarketProducts data={products} /> */}
      <div className="h-full">
        <StockMap />
      </div>
    </div>
  );
};

export default MapPage;
