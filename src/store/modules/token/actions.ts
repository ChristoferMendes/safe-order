import { ActionTypesToken } from "./typescript/actionTypes";

export function setToken(token: string | null) {
  return {
    type: ActionTypesToken.setToken,
    payload: token,
  };
}

export function invalidateToken() {
  return {
    type: ActionTypesToken.invalidateToken,
  };
}
