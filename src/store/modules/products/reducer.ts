/* eslint-disable no-case-declarations */
import { URI } from 'react-native-dotenv';
import { ActionProduct, IProduct, StateProduct } from './typescript';
import { ActionTypesProduct } from './typescript/actionTypes';

const initialState = {} as StateProduct;

export default function product(state = initialState, action: ActionProduct) {
  switch (action.type) {
    case ActionTypesProduct.storeProductInfo:
      const products = action.payload;
      const serializeImageUrl = (item: IProduct) => item.image_url.replace('http://localhost:3333', URI)

      const productsSerialized = products.map((product) =>
        ({ ...product, image_url: serializeImageUrl(product) })
      )

      return { ...state, products: productsSerialized };

    default:
      return state;
  }
}
