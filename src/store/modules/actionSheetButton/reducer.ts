import { ActionTypesActionSheetButton } from "./typescript/actionTypes";

const initialState = {
  quantity: 1,
};

interface Action {
  type: string;
  payload: number[] | undefined
}
/* eslint-disable no-case-declarations */
export default function actionSheetButton(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypesActionSheetButton.increaseQuantity:
      const quantity = action.payload;

      return { ...state, quantity };
    default:
      return state;
  }
}
