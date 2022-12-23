/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import { ActionTypes } from './types';

interface IProduct {
  uuid: string;
  image: string;
  price: number;
  quantity: number;
}

const initialState = {
  products: [] as IProduct[] | [],
};

interface Action {
  type: string;
  payload: {
    product: IProduct,
    quantity: number;
  }
}

interface IInsertIntoArray {
  originalState: {
    products: IProduct[] | []
  };
  insertionIndex: number;
  newData: IProduct;
}

const insertItem = ({ originalState, insertionIndex, newData }: IInsertIntoArray) => [
  ...originalState.products.slice(0, insertionIndex),
  newData,
  ...originalState.products.slice(insertionIndex),
];

function updateObjectInArray(array: IProduct[], action: Action) {
  return array.map((item, index) => {
    const { product, quantity } = action.payload;
    const productIndex = array.findIndex((item) => item.uuid === action.payload.product.uuid);
    const finalProduct = { ...product, quantity, image: '' } as typeof product;
    if (index !== productIndex) {
      console.log('hei');
      return item;
    }

    return {
      ...item,
      ...finalProduct,
    };
  });
}

export default function chart(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.storeProductInChart:
      const { product, quantity } = action.payload;

      const finalProduct = { ...product, quantity, image: '' } as typeof product;

      return {
        ...state,
        products: insertItem(
          { originalState: state, insertionIndex: Number(product.uuid), newData: finalProduct },
        ),
      } as typeof initialState;

    case ActionTypes.updateProductInChart:
      return { ...state, products: updateObjectInArray(state.products, action) };

    default:
      return state;
  }
}
