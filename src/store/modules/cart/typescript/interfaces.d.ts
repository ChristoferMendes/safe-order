interface ICartProduct {
  uuid: string;
  image: string;
  quantity: number;
  quantityRequested: number;
}

interface StateCart {
  products: IProduct[] | []
}


interface ActionCart {
  type: string;
  payload: {
    product: IProduct,
    quantity: number;
  }
}

export { ActionCart, ICartProduct, StateCart };
