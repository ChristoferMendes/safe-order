export const ActionTypes = {
  storeProductInCart: 'STORE_PRODUCT_IN_CART',
  updateProductInCart: 'UPDATE_PRODUCT_IN_CART',
  removeProductInCart: 'REMOVE_PRODUCT_IN_CART',
};

interface IProduct {
  uuid: string;
  image: string;
  price: number;
  quantity: number;
  quantityRequested: number;
}

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

export { IProduct, Action, IInsertIntoArray };
