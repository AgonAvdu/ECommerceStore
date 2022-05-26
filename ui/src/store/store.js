import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import renderSlice from "./renderSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    render: renderSlice,
  },
});
