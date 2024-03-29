import { CategoryEnum } from "./enum";

export interface IProduct {
  name: string;
  image_url: string;
  uuid: string;
  price: number
  quantity: number;
  quantityRequested: number;
  description: string;
  category?: CategoryEnum
}


interface StateProduct {
  products: IProduct[] | null
}

interface ActionProduct {
  type: string;
  payload: IProduct[]
}

type PayloadProduct = IProduct[]

export { IProduct, StateProduct, ActionProduct, PayloadProduct } 