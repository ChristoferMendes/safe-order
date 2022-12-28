import { IProduct } from './typescript';
import { ActionTypesProduct } from './typescript/actionTypes';

export function storeProductInfo(products: IProduct[]) {
  return {
    type: ActionTypesProduct.storeProductInfo,
    payload: products,
  };
}
