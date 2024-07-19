import React from "react";
import { Loader2 } from "lucide-react";
const MarkedMapLoader = () => {
  return (
    <div className="h-full w-full grid place-items-center bg-muted ">
      <Loader2 className="animate-spin text-primary-green w-8 h-8" />
    </div>
  );
};

export default MarkedMapLoader;
