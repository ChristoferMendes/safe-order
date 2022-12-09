export default function user(state = [], action: any) {
  switch (action.type) {
    case 'HELLO_REDUX':
      return [...state, ...action.payload];

    default:
      return state;
  }
}
