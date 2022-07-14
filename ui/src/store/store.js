import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./accountSlice";
import { cartSlice } from "./cartSlice";
import { productsSlice } from "./productsSlice";
import { orderSlice } from "./orderSlice";

// export function configureStore() {
//     return createStore(orderReducer);
// }

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    account: accountSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
  },
});
