interface ICartProduct {
  name: string;
  uuid: string;
  image_url: string;
  quantity: number;
  quantityRequested: number;
  description: string;
  price: number;
}

interface StateCart {
  products: ICartProduct[] | []
}


interface ActionCart {
  type: string;
  payload: {
    product: ICartProduct,
    quantity: number;
  }
}

export { ActionCart, ICartProduct, StateCart };
