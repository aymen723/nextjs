import { googleAccessAuthentication } from "@/client/api/authService/authenticationApi";
import {
  GoogleLogin,
  useGoogleOneTapLogin,
  useGoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import {
  AUTH_SERVICE_URL_V1,
  STOCK_SERVICE_URL_V1,
} from "@/client/config/settings";
import { useAppDispatch } from "@/util/hooks/redux";
import { AuthActions } from "@/redux/AuthSlice";

const MLoginButton = () => {
  const [isConnecting, setIsConnecting] = React.useState(false);
  const dispatch = useAppDispatch();
  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      console.log("oauth res", res);

      googleAccessAuthentication(res.access_token)
        .then((res) => {
          console.log("auth resp", res.data);
          dispatch(
            AuthActions.setAuthData({
              accessToken: res.data.tokenData,
              role: res.data.role,
              id: res.data.id,
            })
          );
        })
        .catch((err) => {
          console.log("auth error :: ", err);
        })
        .finally(() => {
          setIsConnecting(false);
        });
    },
    onError: () => {
      setIsConnecting(false);
    },
    onNonOAuthError: () => {
      setIsConnecting(false);
    },
    include_granted_scopes: true,
  });

  // React.useEffect(() => {
  //   axios({
  //     url: `${STOCK_SERVICE_URL_V1}/stock`,
  //     method: "post",
  //     data: {
  //       message: "hello",
  //     },
  //   })
  //     .then((res) => {
  //       console.log("stock res ", res);
  //     })
  //     .catch((err) => {
  //       console.log("stock err", err);
  //     });
  // }, []);

  return (
    <button
      className="p-2 bg-muted-foreground text-white  shadow text-xs rounded flex gap-2 items-center"
      onClick={() => {
        if (!isConnecting) {
          setIsConnecting(true);
          googleLogin();
        }
      }}
    >
      <span className="text-primary-light">
        {" "}
        {isConnecting ? (
          <AiOutlineLoading className="animate-spin " />
        ) : (
          <FaGoogle />
        )}
      </span>

      <span>Connecter</span>
    </button>
  );
};

export default MLoginButton;
