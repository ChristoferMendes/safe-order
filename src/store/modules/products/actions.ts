import { IProduct } from '../../../components/ProductsList/types';
import { ActionTypes } from './types';

export function storeProductInfo(products: IProduct[]) {
  return {
    type: ActionTypes.storeProductInfo,
    payload: products,
  };
}
