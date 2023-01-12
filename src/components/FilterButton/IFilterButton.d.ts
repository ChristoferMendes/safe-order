import { CategoryEnum } from "../../store/modules/products/typescript/enum";

export interface IFilterButton {
  item: CategoryEnum;
  handleSetCurrentFilter: (filter: CategoryEnum | null) => void

}