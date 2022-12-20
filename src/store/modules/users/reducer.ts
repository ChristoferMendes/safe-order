import { IUser } from '../../../screens/SignUp/SignUp';
import { ActionTypes } from './types';

export default function user(state = [], action: { type: string, payload: IUser}) {
  switch (action.type) {
    case ActionTypes.storeUserInfo:
      return [...state, action.payload];

    default:
      return state;
  }
}
