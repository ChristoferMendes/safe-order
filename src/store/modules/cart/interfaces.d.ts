interface ICartProduct {
  uuid: string;
  image: string;
  quantity: number;
  quantityRequested: number;
}

export interface ICart {
  products: ICartProduct[]
}
