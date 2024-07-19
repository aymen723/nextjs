import React from "react";
import PharmacyAvatar from "./PharmacyAvatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const PharmacyHeader = () => {
  return (
    <div className="h-[4rem] min-h-[4rem] overflow-hidden bg-white/70 w-full flex justify-between items-center px-3">
      <div></div>
      <div>
        <PharmacyAvatar />
      </div>
    </div>
  );
};

export default PharmacyHeader;
