import { combineReducers } from 'redux';
import user from './users/reducer';
import token from './token/reducer';

export default combineReducers({ user, token });
