import { combineReducers } from 'redux';
import user from './users/reducer';
import token from './token/reducer';
import actionSheetButton from './actionSheetButton/reducer';
import product from './products/reducer';
import cart from './cart/cartSlice';

export default combineReducers({
  user, token, actionSheetButton, cart, product,
});
