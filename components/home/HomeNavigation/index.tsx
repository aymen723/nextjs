"use client";

import clsx from "clsx";
import { Pill } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const navigationItems = [
  {
    label: "Accueil",
    path: "/home",
  },
  {
    label: "MarketPlace",
    path: "/market",
  },
  {
    label: "A propos de nous",
    path: "/home/info",
  },
  {
    label: "Contact",
    path: "/home/contact",
  },
];

const HomeNavigation = () => {
  const {} = useRouter();
  const pathname = usePathname();
  React.useEffect(() => {}, [pathname]);
  return (
    <div className="flex justify-between items-center px-8 py-4">
      <div className="flex gap-4 items-center">
        <Pill />
        <h3 className="font-bold text-lg">PharmaConnect</h3>
      </div>
      <div className="flex gap-4  text-sm items-center">
        {navigationItems.map((item) => {
          return (
            <div
              key={item.label}
              className={clsx(" hover:text-black transition-colors", {
                "text-black": item.path === pathname,
                "text-faded-secondary": item.path != pathname,
              })}
            >
              <Link href={item.path}>{item.label}</Link>
            </div>
          );
        })}
        <Link href={"/home/login"}>
          <button className="bg-[#1d1f23] text-white py-2 px-4 rounded-lg  hover:-translate-y-1 transition-transform ">
            SignUp
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeNavigation;
