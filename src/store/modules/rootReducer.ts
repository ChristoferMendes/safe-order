import { combineReducers } from 'redux';
import user from './users/reducer';
import token from './token/reducer';
import actionSheetButton from './actionSheetButton/reducer';

export default combineReducers({ user, token, actionSheetButton });
