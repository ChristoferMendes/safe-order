import { ActionTypes } from './types';

export function increaseQuantity(quantity: number) {
  return {
    type: ActionTypes.increaseQuantity,
    payload: quantity,
  };
}

export function setFinalPrice(price: number) {
  return {
    type: ActionTypes.setFinalPrice,
    payload: price,
  };
}
