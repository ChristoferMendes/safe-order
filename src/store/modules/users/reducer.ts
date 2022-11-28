export default function user(state = [], action: any) {
  switch (action.type) {
    case 'HELLO_REDUX':
      // console.log('Hello Redux from reducer!');
      return [...state, ...action.payload];

    default:
      return state;
  }
}
