import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CartState = {
  purchaseCart?: {
    pharmacyId: number;
    products: number[];
  };
};

const initialState: CartState = {};

export const cartSlice = createSlice({
  initialState: initialState,
  name: "cart",
  reducers: {
    createCart(state, action: PayloadAction<CartState["purchaseCart"]>) {
      const newCart = action.payload;

      state.purchaseCart = newCart;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const CartActions = cartSlice.actions;
