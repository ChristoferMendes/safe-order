import { Action, IProduct } from './types';

const initialState = {
  products: [] as IProduct[] | [],
};

function createProductWithQuantityRequested(action: Action) {
  const { product, quantity } = action.payload;
  const productWithQuantity = { ...product, quantityRequested: quantity };

  return { productWithQuantity };
}

function findProductIndex(state = initialState, action: Action) {
  const { products } = state;
  const { product } = action.payload;
  const productIndex = products.findIndex((item) => item.uuid === product.uuid);

  return { productIndex };
}

function insertItem(state = initialState, action: Action) {
  const { product } = action.payload;
  const { productWithQuantity } = createProductWithQuantityRequested(action);
  const copyOfProductsArray = state.products.slice();
  copyOfProductsArray.splice(+product.uuid, 0, productWithQuantity);

  return copyOfProductsArray;
}

function updateItem(state = initialState, action: Action) {
  return state.products.map((item, index) => {
    const { productIndex } = findProductIndex(state, action);

    const { productWithQuantity } = createProductWithQuantityRequested(action);
    if (index !== productIndex) {
      return item;
    }

    return {
      ...item,
      ...productWithQuantity,
    };
  });
}

function removeItem(state = initialState, action: Action) {
  const { productIndex } = findProductIndex(state, action);
  return state.products.filter((_, index) => index !== productIndex);
}

export { insertItem, updateItem, removeItem };
