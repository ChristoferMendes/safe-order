import { IProduct } from '../../../components/ProductsList/types';
import { ActionTypes } from './types';

export function storeProductInChart(product: IProduct, resultPrice: number) {
  return {
    type: ActionTypes.storeProductInChart,
    payload: {
      product,
      resultPrice,
    },
  };
}
