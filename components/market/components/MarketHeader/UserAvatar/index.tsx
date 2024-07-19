"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthActions } from "@/redux/AuthSlice";
import useGetUserProfile from "@/util/hooks/api/useGetUserProfile";
import { useAppDispatch, useAppSelector } from "@/util/hooks/redux";
import { Album, LogOut, Settings2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

const UserAvatar = () => {
  const authData = useAppSelector((app) => app.auth.authData);
  const { profileData } = useGetUserProfile(authData?.id || 0);
  const dispatch = useAppDispatch();

  const router = useRouter();

  React.useEffect(() => {
    console.log("profile data", profileData);
  }, [profileData]);

  const fallBack = React.useMemo(() => {
    return profileData?.username?.charAt(0)?.toUpperCase() ?? "U";
  }, [profileData]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8 cursor-pointer select-none">
          <AvatarImage
            src={profileData?.picture}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>{fallBack}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            router.push("/market/user/purchases");
          }}
        >
          <ShoppingCart className="mr-2 size-4 " />
          <span className="text-sm">Achats</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/market/user/bookmarks");
          }}
        >
          <Album className="mr-2 size-4" />
          <span>Signets</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            dispatch(AuthActions.logout());
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
