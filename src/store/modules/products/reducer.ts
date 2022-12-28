/* eslint-disable no-case-declarations */
import { ActionProduct, StateProduct } from './typescript';
import { ActionTypesProduct } from './typescript/actionTypes';

const initialState = {} as StateProduct;

export default function product(state = initialState, action: ActionProduct) {
  switch (action.type) {
    case ActionTypesProduct.storeProductInfo:
      const products = action.payload;

      return { ...state, ...products };

    default:
      return state;
  }
}
