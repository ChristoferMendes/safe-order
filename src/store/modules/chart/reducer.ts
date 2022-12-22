/* eslint-disable no-case-declarations */
import { ActionTypes } from './types';

interface IProduct {
  uuid: string;
  image: string;
  price: number;
  quantity: number;
}

interface State {
  product: IProduct | null
}
const initialState = {} as State;

interface Action {
  type: string;
  payload: IProduct
}

export default function chart(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.storeProductInChart:
      const products = action.payload;

      return { ...state, ...products };

    default:
      return state;
  }
}
