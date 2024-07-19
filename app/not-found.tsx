import Link from "next/link";
import React from "react";

const FourOFour = () => {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-bold text-3xl">404</h2>
        <h4 className="font-semibold text-md">page not found</h4>
        <Link href={"/"}>
          <button className="bg-black px-4 py-2 text-white rounded-md">
            Go to landing page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FourOFour;
