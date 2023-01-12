import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { CategoryEnum } from "../products/typescript/enum";

const initialState = {
  filter: null as CategoryEnum | null
}

const productFilterSlice = createSlice({
  initialState,
  name: 'productFilter',
  reducers: {
    setFilter(state, { payload }: { payload: CategoryEnum | null}) {
      console.log('PAYLOAD:', payload)
      return { ...state, filter: payload }
    }
  }
})

export const { setFilter } = productFilterSlice.actions;

export const selectProductFilter = (state: RootState) => state.productFilter;

const productFilter = productFilterSlice.reducer;

export default productFilter
