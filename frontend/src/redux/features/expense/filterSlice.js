import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredExpense: [],
};

const filterSlice = createSlice({
  name: "filterExpense",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      console.log("hele", products);
      const tempProducts = products.filter(
        (product) =>
          product?.to?.toLowerCase().includes(search.toLowerCase()) ||
          product?.description?.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredExpense = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredExpense = (state) =>
  state.expensefilter.filteredExpense;

export default filterSlice.reducer;
