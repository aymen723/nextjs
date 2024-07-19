import { createSlice } from "@reduxjs/toolkit";

interface ShowState {
  isShown: boolean;
}

const initialState: ShowState = {
  isShown: false,
};

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    ShowState: (state) => {
      state.isShown = !state.isShown;
    },
  },
});

export const { ShowState } = showSlice.actions;
export default showSlice.reducer;
