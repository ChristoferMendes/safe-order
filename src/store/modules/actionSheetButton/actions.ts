import { ActionTypesActionSheetButton } from "./typescript/actionTypes";

export function increaseQuantity(quantity: number) {
  return {
    type: ActionTypesActionSheetButton.increaseQuantity,
    payload: quantity,
  };
}

export function setFinalPrice(price: number) {
  return {
    type: ActionTypesActionSheetButton.setFinalPrice,
    payload: price,
  };
}
