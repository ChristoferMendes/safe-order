import { ActionCart, StateCart } from "../typescript/interfaces";

const initialState = {
  products: []
} as StateCart;

function createProductWithQuantityRequested(payload: ActionCart['payload']) {
  const { product, quantity } = payload;

  const optionalQuantityKey = quantity && { quantityRequested: quantity }

  const productWithQuantity = {
    ...product,
    ...(optionalQuantityKey)
  };

  return { productWithQuantity };
}

function findProductIndex(state = initialState, payload: ActionCart['payload']) {
  const { products: productsInState } = state;
  const { product } = payload;
  const productIndex = productsInState.findIndex((item) => item.uuid === product.uuid);

  return { productIndex };
}

function insertItem(state = initialState, payload: ActionCart['payload']) {
  const { productWithQuantity } = createProductWithQuantityRequested(payload);
  const copyOfProductsArray = [...state.products];
  const productUuidToNumber = +productWithQuantity.uuid;
  copyOfProductsArray.splice(productUuidToNumber, 0, productWithQuantity);

  return copyOfProductsArray;
}

function updateItem(state = initialState, payload: ActionCart['payload']) {
  return state.products.map((item, index) => {
    const { productIndex } = findProductIndex(state, payload);

    const { productWithQuantity } = createProductWithQuantityRequested(payload);
    if (index !== productIndex) {
      return item;
    }

    return {
      ...item,
      ...productWithQuantity,
    };
  });
}

function removeItem(state = initialState, payload: ActionCart['payload']) {
  const { productIndex } = findProductIndex(state, payload);
  return state.products.filter((_, index) => index !== productIndex)
}

export { insertItem, updateItem, removeItem };
