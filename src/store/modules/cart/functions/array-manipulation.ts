import { ActionCart, StateCart } from "../typescript/interfaces";

const initialState = {
  products: []
} as StateCart;

function createProductWithQuantityRequested(action: ActionCart) {
  const { product, quantity } = action.payload;
  const productWithQuantity = { ...product, quantityRequested: quantity };

  return { productWithQuantity };
}

function findProductIndex(state = initialState, action: ActionCart) {
  const { products } = state;
  const { product } = action.payload;
  const productIndex = products.findIndex((item) => item.uuid === product.uuid);

  return { productIndex };
}

function insertItem(state = initialState, action: ActionCart) {
  const { product } = action.payload;
  const { productWithQuantity } = createProductWithQuantityRequested(action);
  const copyOfProductsArray = state.products.slice();
  copyOfProductsArray.splice(+product.uuid, 0, productWithQuantity);

  return copyOfProductsArray;
}

function updateItem(state = initialState, action: ActionCart) {
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

function removeItem(state = initialState, action: ActionCart) {
  const { productIndex } = findProductIndex(state, action);
  return state.products.filter((_, index) => index !== productIndex);
}

export { insertItem, updateItem, removeItem };
