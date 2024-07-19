import { Pill } from "lucide-react";
import React from "react";

const ScreenLoader = () => {
  return (
    <div className="h-screen w-full grid place-items-center">
      <Pill className="text-primary-green size-8 animate-spin" />
    </div>
  );
};

export default ScreenLoader;
