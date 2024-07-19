import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./couterSlice";

import showReducer from "./showSlice";
import { GlobalStateReducer } from "./GlobalStateSlice";
import { AuthReducer } from "./AuthSlice";
// ...

export const store = configureStore({
  reducer: {
    couter: counterReducer,
    globals: GlobalStateReducer,
    show: showReducer,
    auth: AuthReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
