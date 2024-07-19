import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetUserProfile from "@/util/hooks/api/useGetUserProfile";
import { useAppSelector } from "@/util/hooks/redux";
import React from "react";

const PharmacyAvatar = () => {
  const authData = useAppSelector((app) => app.auth.authData);
  const { profileData } = useGetUserProfile(authData?.id ?? 0);

  return (
    <Avatar className="size-10 rounded-xl">
      <AvatarImage src={profileData?.picture}></AvatarImage>
      <AvatarFallback>
        {profileData?.username ? profileData.username.charAt(0) : "U"}
      </AvatarFallback>
    </Avatar>
  );
};

export default PharmacyAvatar;
