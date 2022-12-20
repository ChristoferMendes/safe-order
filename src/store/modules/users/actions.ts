import { IUser } from '../../../screens/SignUp/SignUp';
import { ActionTypes } from './types';

export function storeUserInfo(userInfo: IUser) {
  return {
    type: ActionTypes.storeUserInfo,
    payload: userInfo,
  };
}
