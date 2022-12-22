/* eslint-disable no-case-declarations */
import { ActionTypes } from './types';

interface IProduct {
  uuid: string;
  image: string;
  price: number;
  quantity: number;
}

const initialState = {
  products: [] as IProduct[] | [],
};

interface Action {
  type: string;
  payload: {
    product: IProduct,
    resultPrice: number;
  }
}

export default function chart(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.storeProductInChart:
      const { product, resultPrice } = action.payload;
      const finalProduct = { ...product, price: resultPrice } as typeof product;
      console.log('calleddd', finalProduct);
      // const newState = [...state.products, product];

      return { ...state, products: [product] } as typeof initialState;

    default:
      return state;
  }
}
