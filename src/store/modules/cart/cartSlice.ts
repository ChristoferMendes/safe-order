import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { PayloadCart, StateCart } from "./typescript/interfaces";
import { insertItem, removeItem, updateItem } from './functions/array-manipulation'

const initialState = {
  products: []
} as StateCart;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    storeProductInCart(state, { payload }: { payload: PayloadCart }) {
      return { ...state, products: insertItem(state, payload) }
    },
    updateProductInCart(state, { payload }: { payload: PayloadCart }) {
      return { ...state, products: updateItem(state, payload) }
    },
    removeProductInCart(state, { payload }: { payload: PayloadCart }) {
      return { ...state, products: removeItem(state, payload) }
    },
  },
})

export const { storeProductInCart, updateProductInCart, removeProductInCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

const cart = cartSlice.reducer;

export default cart;
