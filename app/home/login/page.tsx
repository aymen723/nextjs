"use client";
import {
  credentialAuthentication,
  googleAccessAuthentication,
} from "@/client/api/authService/authenticationApi";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { AtSign, Loader2, Lock } from "lucide-react";
import { SiGoogle } from "react-icons/si";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/util/hooks/redux";
import { AuthActions } from "@/redux/AuthSlice";
import { toast } from "sonner";
import { cn } from "@/lib/util";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isCredentialLogin, setIsCredentialLogin] = React.useState(false);
  const [isGooleLogin, setIsGooleLogin] = React.useState(false);
  const [isInitialising, setIsinitialising] = React.useState(false);
  const isLogin = isCredentialLogin || isGooleLogin;
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      googleAccessAuthentication(res.access_token)
        .then((res) => {
          setIsinitialising(true);
          console.log("google oauth response", res.data);
          toast.success("authentifié avec succès");
          dispatch(
            AuthActions.setAuthData({
              id: res.data.id,
              role: res.data.role,
              accessToken: res.data.tokenData,
            })
          );
          router.push("/market");
        })
        .finally(() => {
          setIsGooleLogin(false);
        });
    },
    onError: () => {
      setIsGooleLogin(false);
    },
    onNonOAuthError: () => {
      setIsGooleLogin(false);
    },
  });

  return (
    <div className="p-8 w-[40rem] mx-auto mt-20  relative">
      <div
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0 grid place-items-center bg-muted/30",
          {
            hidden: !isInitialising,
          }
        )}
      >
        <Loader2 className="size-8 text-primary-green animate-spin" />
      </div>
      <div className="p-8 shadow-lg rounded-md bg-white/70">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLogin) {
              setIsCredentialLogin(true);
              credentialAuthentication({
                email,
                password,
              })
                .then((res) => {
                  console.log("credentail login respone : ", res.data);
                  toast.success("authentifié avec succès");
                  setIsinitialising(true);
                  dispatch(
                    AuthActions.setAuthData({
                      id: res.data.id,
                      role: res.data.role,
                      accessToken: res.data.tokenData,
                    })
                  );
                  if (res.data.role === "PHARMACY")
                    router.push("/pharmacy/stock");
                })
                .catch((e) => {
                  console.log("credential login error : ", e);
                })
                .finally(() => {
                  setIsCredentialLogin(false);
                });
            }
          }}
        >
          <h2 className="text-center font-bold text-2xl mb-4">Connection</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 outline outline-muted-foreground/30 items-center p-1 rounded focus-within:outline-muted-foreground/70 group hover:outline-muted-foreground/70">
              <AtSign className="size-4 text-muted-foreground/70 group-focus-within:text-muted-foreground" />
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                className="w-full bg-transparent outline-none focus:outline-none focus:border-none text-muted-foreground/90  group-focus-within:text-primary"
                placeholder="Email"
              />
            </div>
            <div className="flex gap-2 outline outline-muted-foreground/30 items-center p-1 rounded focus-within:outline-muted-foreground/70 group hover:outline-muted-foreground/70">
              <Lock className="size-4 text-muted-foreground/70 group-focus-within:text-muted-foreground" />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="w-full bg-transparent outline-none focus:outline-none focus:border-none text-muted-foreground/90  group-focus-within:text-primary"
                placeholder="Password"
              />
            </div>
          </div>
          <button className="mx-auto px-2 py-1 bg-muted/70 rounded my-3 shadow outline outline-muted-foreground/20 hover:outline-muted-foreground/50 flex gap-2 items-center">
            {isCredentialLogin && (
              <span>
                <Loader2 className="size-4 animate-spin" />
              </span>
            )}
            <span>Connecter</span>
          </button>
        </form>
        <div className="flex items-center gap-2">
          <div className="h-[1px] bg-muted-foreground/30 my-4 w-full"></div>
          <span>ou</span>
          <div className="h-[1px] bg-muted-foreground/30 my-4 w-full"></div>
        </div>

        <button
          className="flex w-full gap-2 items-center justify-between px-3 py-2 shadow outline-muted outline rounded group hover:bg-primary-green transition-colors bg-white"
          onClick={() => {
            if (!isLogin) {
              setIsGooleLogin(true);
              googleLogin();
            }
          }}
        >
          <span>
            {isGooleLogin ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <SiGoogle className="text-primary-green group-hover:text-white transition-colors" />
            )}
          </span>
          <span className="text-sm group-hover:text-white transition-colors">
            Avec Google
          </span>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
