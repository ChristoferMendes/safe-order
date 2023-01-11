import { createContext, ReactNode, useContext, useMemo } from "react";
import { IProduct } from "../../../store/modules/products/typescript";
import { ICardProductContext } from "./ICartProductContext";

const CartProductContext = createContext({} as ICardProductContext);

export const CartProductProvider = ({ children, product }: { children: ReactNode, product: IProduct }) => {
  const memoizedProduct = useMemo(() => ({ product }), [product])

  return <CartProductContext.Provider value={memoizedProduct}>{children}</CartProductContext.Provider>
}

export const useCartProductContext = () => useContext(CartProductContext)