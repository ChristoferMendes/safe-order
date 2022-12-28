import { insertItem, removeItem, updateItem } from './functions/array-manipulation';
import { ActionTypesCart } from './typescript/actionTypes';
import { ActionCart, StateCart } from './typescript/interfaces';

const initialState = {
  products: []
} as StateCart;

export default function cart(state = initialState, action: ActionCart) {
  switch (action.type) {
    case ActionTypesCart.storeProductInCart:
      return { ...state, products: insertItem(state, action) };

    case ActionTypesCart.updateProductInCart:
      return { ...state, products: updateItem(state, action) };

    case ActionTypesCart.removeProductInCart:
      return { ...state, products: removeItem(state, action) };
    default:
      return state;
  }
}
