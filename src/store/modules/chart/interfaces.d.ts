interface ICartProduct {
  uuid: string;
  image: string;
  quantity: number;
}

export interface IChart {
  products: ICartProduct[]
}
