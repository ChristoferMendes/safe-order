/* eslint-disable no-case-declarations */
import { IUser } from '../../../screens/Register/Register';
import { ActionTypes } from './types';

type State = IUser | null;
type Action = {
  type: string;
  payload: IUser | null;
}
const initialState = null as State;

export default function user(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.storeUserInfo:
      const user = action.payload;
      return { ...state, ...user };

    default:
      return state;
  }
}
