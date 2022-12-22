import { ActionTypes } from './types';

export function increaseQuantity(quantity: number) {
  return {
    type: ActionTypes.increaseQuantity,
    payload: quantity,
  };
}
