export interface IProduct {
  image: string;
  uuid: string;
  price: number
  quantity: number;
  quantityRequested: number;
}


interface StateProduct {
  products: IProduct[] | null
}

interface ActionProduct {
  type: string;
  payload: IProduct[]
}

export { IProduct, StateProduct, ActionProduct } 