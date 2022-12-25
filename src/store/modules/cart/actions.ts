import { IProduct } from '../../../components/ProductsList/types';
import { ActionTypes } from './types';

export function storeProductInCart(product: IProduct, quantity: number) {
  return {
    type: ActionTypes.storeProductInCart,
    payload: {
      product,
      quantity,
    },
  };
}

export function updateProductInCart(product: IProduct, quantity: number) {
  return {
    type: ActionTypes.updateProductInCart,
    payload: {
      product,
      quantity,
    },
  };
}

export function removeProductInCart(productUuid: IProduct['uuid']) {
  return {
    type: ActionTypes.removeProductInCart,
    payload: {
      product: {
        uuid: productUuid,
      },
    },
  };
}
