/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import { insertItem, removeItem, updateItem } from './array-manipulation';
import {
  Action, ActionTypes, IProduct,
} from './types';

const initialState = {
  products: [] as IProduct[] | [],
};

export default function cart(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.storeProductInCart:
      return { ...state, products: insertItem(state, action) };

    case ActionTypes.updateProductInCart:
      return { ...state, products: updateItem(state, action) };

    case ActionTypes.removeProductInCart:
      return { ...state, products: removeItem(state, action) };
    default:
      return state;
  }
}
