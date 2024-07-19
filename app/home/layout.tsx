import HomeNavigation from "@/components/home/HomeNavigation";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Homelayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="bg-[#EAEAEA] min-h-screen  ">
        <HomeNavigation />
        <main className="px-8">{children}</main>
        <Toaster position="top-right" />
      </div>
      <footer className=" bg-basic-secondary text-basic-main p-8">
        <div className="flex flex-col gap-2">
          <div>© PharmaConnect 2024. All rights reserved.</div>
          <div>Terms of Service | Privacy Policy</div>
          <div>Contact Us | Support</div>
        </div>
      </footer>
    </>
  );
};

export default Homelayout;
