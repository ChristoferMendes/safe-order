import { combineReducers } from 'redux';
import user from './users/reducer';
import token from './token/reducer';
import actionSheetButton from './actionSheetButton/reducer';
import cart from './cart/cartSlice';
import product from './products/productSlice'

export default combineReducers({
  user, token, actionSheetButton, cart, product,
});
