import { IProduct } from '../../../components/ProductsList/types';
import { ActionTypes } from './types';

export function storeProductInChart(product: IProduct, quantity: number) {
  return {
    type: ActionTypes.storeProductInChart,
    payload: {
      product,
      quantity,
    },
  };
}

export function updateProductInChart(product: IProduct, quantity: number) {
  return {
    type: ActionTypes.updateProductInChart,
    payload: {
      product,
      quantity,
    },
  };
}
