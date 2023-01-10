import { createContext, ReactNode, useContext, useMemo } from "react";
import { IProduct } from "../../../store/modules/products/typescript";
import { IActionSheetContext } from "./IActionSheetContext";

const ActionSheetContext = createContext({} as IActionSheetContext);

export const ActionSheetProvider = ({ children, product }: { children: ReactNode, product: IProduct }) => {
  const productMemoized = useMemo(() => ({ product }), [product])


  return <ActionSheetContext.Provider value={productMemoized}>{children}</ActionSheetContext.Provider>
}

export const useActionSheetContext = () => useContext(ActionSheetContext)