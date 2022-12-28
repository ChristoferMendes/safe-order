import { IUser } from '../../../screens/Register/typescript';
import { ActionTypesUser } from './typescript/actionTypes';

export function storeUserInfo(userInfo: IUser | null) {
  return {
    type: ActionTypesUser.storeUserInfo,
    payload: userInfo,
  };
}
