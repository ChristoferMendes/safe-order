import { combineReducers } from 'redux';
import user from './users/reducer';
import token from './token/reducer';
import actionSheetButton from './actionSheetButton/reducer';
import chart from './chart/reducer';
import product from './products/reducer';

export default combineReducers({
  user, token, actionSheetButton, chart, product,
});
