"use client";
import {
  LogOut,
  PackageSearch,
  PanelTop,
  Pill,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/util";
import { usePathname } from "next/navigation";
import { AuthActions } from "@/redux/AuthSlice";
import { useAppDispatch } from "@/util/hooks/redux";

const navigationItems = [
  {
    name: "Infomation",
    link: "/pharmacy/info",
    icon: PanelTop,
  },
  {
    name: "Stock",
    link: "/pharmacy/stock",
    icon: PackageSearch,
  },
  {
    name: "Achats",
    link: "/pharmacy/orders",
    icon: ShoppingCart,
  },
];

const PharmacyNavigation = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  return (
    <div className="min-w-[14rem] w-[14rem] bg-white/70 flex flex-col">
      <Link href={"/home"}>
        <div className="flex gap-2 items-center justify-center p-4">
          <div className="p-2 rounded-sm bg-primary-green">
            <Pill className="size-4 text-white" />
          </div>
          <div className="font-semibold text-lg">PharmaConnect</div>
        </div>
      </Link>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 p-4">
          {navigationItems.map((nav) => {
            return (
              <Link href={nav.link} key={nav.link}>
                <div
                  className={cn(
                    "flex items-center gap-2 text-muted-foreground/70 hover:bg-muted rounded p-2",
                    {
                      " bg-primary-green hover:bg-primary-green text-white":
                        nav.link === pathname,
                    }
                  )}
                >
                  <nav.icon className="size-5" />
                  <span className="text-sm">{nav.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="p-4">
          <button
            className="flex w-full items-center gap-2 text-muted-foreground hover:bg-muted rounded p-2 "
            onClick={() => {
              dispatch(AuthActions.logout());
            }}
          >
            <LogOut className="size-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyNavigation;
