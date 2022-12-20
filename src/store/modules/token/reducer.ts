/* eslint-disable no-case-declarations */
import AsyncStorage from '@react-native-async-storage/async-storage';

type State = string | null
const initialState = null as State;

type Action = {
  type: string
  payload: string
}

export default function token(state = initialState, action: Action) {
  switch (action.type) {
    case 'INVALIDATE_TOKEN':
      return { state, token: null };
    case 'SET_TOKEN':
      const token = action.payload;

      return { state, token };
    default:
      return state;
  }
}
