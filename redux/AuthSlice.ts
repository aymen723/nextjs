import type {
  TokenData,
  UserRole,
} from "@/client/types/responses/authResponses";
import {
  eraseLocalAuthState,
  setLocalAuthState,
} from "@/util/lib/localStateManagement";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthData = {
  accessToken: TokenData;
  role: UserRole;
  id: number;
};

type AuthState = {
  authData?: AuthData;
  isValidated: boolean;
};

const initialState: AuthState = {
  authData: undefined,
  isValidated: false,
};

const AuthSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      setLocalAuthState(action.payload);
      state.authData = action.payload;
    },
    logout: (state) => {
      eraseLocalAuthState();
      state.authData = undefined;
    },

    validate: (state) => {
      state.isValidated = true;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;

export const isUserAuthenticated = (auth?: AuthData, role?: UserRole) => {
  if (!auth) return false;
  if (role && auth.role !== role) return false;
  return true;
};
