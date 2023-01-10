import { createSlice } from "@reduxjs/toolkit";
import { URI } from "react-native-dotenv";
import { RootState } from "../..";
import { IProduct, StateProduct, PayloadProduct } from "./typescript";

const initialState = {} as StateProduct;

const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    storeProductInfo (state, { payload }: { payload: PayloadProduct }) {
      const products = payload;
      const serializeImageUrl = (item: IProduct) => item.image_url.replace('http://localhost:3333', URI)

      const productsSerialized = products.map((product) =>
        ({ ...product, image_url: serializeImageUrl(product) })
      )

      return { ...state, products: productsSerialized };
    }
  }
})

export const { storeProductInfo } = productSlice.actions

export const selectProduct = (state: RootState) => state.product

const product = productSlice.reducer;

export default product;
