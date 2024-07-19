import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GlobalState = {
  permissions: {
    geolocationPermission: "granted" | "prompt" | "denied";
  };
};

const initialState: GlobalState = {
  permissions: {
    geolocationPermission: "denied",
  },
};

const GlobalStateSlice = createSlice({
  initialState: initialState,
  name: "globalstate",
  reducers: {
    setGeolocated: (
      state,
      action: PayloadAction<GlobalState["permissions"]["geolocationPermission"]>
    ) => {
      state.permissions.geolocationPermission = action.payload;
    },
  },
});

export const GlobalStateActions = GlobalStateSlice.actions;
export const GlobalStateReducer = GlobalStateSlice.reducer;
