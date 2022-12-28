import { ActionToken, StateToken } from "./typescript";
import { ActionTypesToken } from "./typescript/actionTypes";


const initialState = {
  token: null
} as StateToken;

export default function token(state = initialState, action: ActionToken) {
  switch (action.type) {
    case ActionTypesToken.invalidateToken:
      return { ...state, token: null } as StateToken;
    case ActionTypesToken.setToken:
      const token = action.payload;

      return { ...state, token } as StateToken;
    default:
      return state;
  }
}
