import type { Product } from "@/components/market/MarketProducts";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ProductInfo = {
  count: number;
  data: Product;
};

export type ProductState = Record<number, ProductInfo>;

const initialState: ProductState = {};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    incrementCount(state, action: PayloadAction<{ productId: number }>) {
      const { productId } = action.payload;
      const prodInfo = state[productId];
      state[productId] = { ...prodInfo, count: prodInfo.count + 1 };
    },
    decrementCount(state, action) {
      const { productId } = action.payload;
      const prodInfo = state[productId];
      state[productId] = { ...prodInfo, count: prodInfo.count - 1 };
    },

    setValues(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      products.forEach((prod) => {
        state[prod.id] = {
          data: prod,
          count: state[prod.id]?.count ?? 0,
        };
      });
    },
  },
});

export const ProductSliceActions = productSlice.actions;
export default productSlice.reducer;
