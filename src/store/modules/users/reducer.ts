import { ActionUser, StateUser } from './typescript';
import { ActionTypesUser } from './typescript/actionTypes';

const initialState = {
  user: {}
} as StateUser

export default function user(state = initialState, action: ActionUser) {
  switch (action.type) {
    case ActionTypesUser.storeUserInfo:
      const user = action.payload;
      return { ...state, user } as StateUser;

    default:
      return state;
  }
}
