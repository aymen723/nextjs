import { getGeolocation } from "@/util/lib/geolocation";
import { GlobalStateActions } from "@/redux/GlobalStateSlice";
import { useAppDispatch, useAppSelector } from "@/util/hooks/redux";
import React from "react";
import { getLocalAuthState } from "@/util/lib/localStateManagement";
import { AuthActions } from "@/redux/AuthSlice";

const StateController = () => {
  const permissions = useAppSelector((app) => app.globals);
  const authData = useAppSelector((app) => app.auth.authData);
  const isAuthValidated = useAppSelector((app) => app.auth.isValidated);
  const dispatcher = useAppDispatch();

  React.useEffect(() => {
    const onGeolocationPermissionChange = (permission: PermissionStatus) => {
      dispatcher(GlobalStateActions.setGeolocated(permission.state));
    };
    navigator.permissions.query({ name: "geolocation" }).then((permission) => {
      permission.addEventListener("change", (e) => {
        onGeolocationPermissionChange(permission);
      });
    });
  }, [dispatcher]);

  React.useEffect(() => {
    if (!authData && !isAuthValidated) {
      getLocalAuthState()
        .then((data) => {
          dispatcher(AuthActions.setAuthData(data));
        })
        .finally(() => {
          dispatcher(AuthActions.validate());
        });
    }
  }, [dispatcher, authData, isAuthValidated]);

  // React.useEffect(() => {
  //   getGeolocation().then(() => {
  //     dispatcher(GlobalStateActions.setGeolocated("granted"));
  //   });
  // }, [dispatcher]);

  return null;
};

export default StateController;
