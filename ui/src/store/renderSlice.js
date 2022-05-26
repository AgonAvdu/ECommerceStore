import { createSlice } from "@reduxjs/toolkit";

export const renderSlice = createSlice({
  name: "render", //
  initialState: {
    render: false,
  },
  reducer: {
    setRender: (state) => {
      state.products = !state.products;
    },
  },
});

export const { setProducts } = renderSlice.actions;

export default renderSlice.reducer;
