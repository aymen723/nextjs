"use client";
import { useAppSelector } from "@/util/hooks/redux";
import { useRouter } from "next/navigation";
import React from "react";
type Props = { children: React.ReactNode };

const MarketUserLayout = ({ children }: Props) => {
  const authState = useAppSelector((app) => app.auth);
  const router = useRouter();
  const isReady =
    authState.isValidated &&
    !!authState.authData &&
    authState.authData.role === "CLIENT";

  React.useEffect(() => {
    if (authState.isValidated && !isReady) router.push("/market");
  }, [authState, isReady, router]);
  return <>{isReady ? children : <div>Loading</div>}</>;
};

export default MarketUserLayout;
