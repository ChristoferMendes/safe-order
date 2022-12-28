import { IProduct } from "../products/typescript";
import { ActionTypesCart } from "./typescript/actionTypes";

export function storeProductInCart(product: IProduct, quantity: number) {
  return {
    type: ActionTypesCart.storeProductInCart,
    payload: {
      product,
      quantity,
    },
  };
}

export function updateProductInCart(product: IProduct, quantity: number) {
  return {
    type: ActionTypesCart.updateProductInCart,
    payload: {
      product,
      quantity,
    },
  };
}

export function removeProductInCart(productUuid: IProduct['uuid']) {
  return {
    type: ActionTypesCart.removeProductInCart,
    payload: {
      product: {
        uuid: productUuid,
      },
    },
  };
}
