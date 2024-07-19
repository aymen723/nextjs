"use client";
import { AuthActions } from "@/redux/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/util/hooks/redux";
import { cn } from "@/util/lib/utils";
import {
  Bookmark,
  LayoutGrid,
  List,
  LogOut,
  MapPinned,
  Pill,
  Settings,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  {
    name: "Market",
    path: "/market",
    icon: LayoutGrid,
  },
  {
    name: "Produits",
    path: "/market/products",
    icon: List,
  },
  {
    name: "Map",
    path: "/market/map",
    icon: MapPinned,
  },
  {
    name: "Achats",
    path: "/market/user/purchases",
    icon: ShoppingBasket,
    locked: true,
  },
  {
    name: "Signets",
    path: "/market/user/bookmarks",
    icon: Bookmark,
    locked: true,
  },
];

const MarketNavigation = () => {
  const authData = useAppSelector((app) => app.auth.authData);
  const isAuthenticated = !!authData;

  const pathname = usePathname();

  const dispatch = useAppDispatch();

  return (
    <nav className="bg-basic-secondary w-[14rem] min-w-[14rem] max-h-screen px-2 py-4 flex flex-col gap-4 overflow-auto text-basic-main justify-between">
      <Link href={"/home"}>
        <div className="flex gap-4 justify-center items-center">
          <Pill className="text-primary-light" />
          <h2>PharmaConnect</h2>
        </div>
      </Link>
      <div className="flex-1  overflow-auto flex flex-col gap-2 py-2">
        {navLinks.map((navlink) => {
          const isActive = navlink.path === pathname;
          if (navlink.locked && !isAuthenticated) return null;
          return (
            <Link key={navlink.path} href={navlink.path}>
              <div
                className={cn(" flex py-2 px-4 gap-3 rounded  items-center ", {
                  "hover:bg-gradient-to-r from-muted/20 to-muted/5": !isActive,
                  "bg-gradient-to-r from-primary-green/30 to-primary-green/0 text-primary-green":
                    isActive,
                })}
              >
                <navlink.icon
                  className={cn("size-5", {
                    "text-primary-green": isActive,
                  })}
                />
                <span className="text-sm">{navlink.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {isAuthenticated && (
        <div className="flex flex-col gap-2">
          <div
            className=" text-sm flex gap-8 items-center px-2 py-2 hover:bg-faded-secondary"
            role="button"
            onClick={() => {
              dispatch(AuthActions.logout());
            }}
          >
            <LogOut className="h-4 w-4" />
            <h3>Logout</h3>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MarketNavigation;
