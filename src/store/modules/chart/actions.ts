import { IProduct } from '../../../components/ProductsList/types';
import { ActionTypes } from './types';

export function storeProductInChart(product: IProduct) {
  return {
    type: ActionTypes.storeProductInChart,
    payload: product,
  };
}
