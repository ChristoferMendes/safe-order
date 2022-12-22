import { ActionTypes } from './types';

type State = number;
const initialState = 1 as State;

interface Action {
  type: string;
  payload: number
}
/* eslint-disable no-case-declarations */
export default function actionSheetButton(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.increaseQuantity:
      const quantity = action.payload;

      return quantity;
    default:
      return state;
  }
}
