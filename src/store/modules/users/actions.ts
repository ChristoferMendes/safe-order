import { IUser } from '../../../screens/Register/Register';
import { ActionTypes } from './types';

export function storeUserInfo(userInfo: IUser | null) {
  return {
    type: ActionTypes.storeUserInfo,
    payload: userInfo,
  };
}
