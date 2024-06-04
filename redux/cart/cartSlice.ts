import { Product } from "@/network/service/product.service";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  products: Product[];
};

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productExist = state.products.some(
        (product) => product.id === action.payload?.id
      );
      if (!productExist) {
        const copyProduct = state.products.slice(0);
        copyProduct.push(action.payload);
        state.products = copyProduct;
      }
    },
    removeProduct: (state, action) => {
      const copyProduct = state.products.slice(0);
      state.products = copyProduct.filter(
        (product) => product.id !== action.payload
      );
    },
    clearProduct: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, removeProduct, clearProduct } = cartSlice.actions;
export default cartSlice.reducer;
