import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { CART_URL } from "../hoc/Variables";
import axios from "axios";
import { getCookie } from "../util/util";

axios.defaults.withCredentials = true;
const initialState = {
  cart: {
    id: null,
    buyerId: null,
    items: [],
  },
  status: "idle", //'idle' || 'loading' || 'succeeded' || 'failed'
  error: null,
};

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCartAsync",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(CART_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie("buyerId")) return false;
    },
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (productId) => {
    const response = await axios.post(
      `${CART_URL}?productId=${productId}&quantity=${1}`,
      {}
    );
    console.log(response.data);
    return response.data;
  }
);
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async (obj) => {
    console.log(obj);
    const response = await axios.delete(
      `${CART_URL}?productId=${obj.productId}&quantity=${obj.quantity}`
    );
    console.log(response.data);
    return obj;
  }
);

export const cartSlice = createSlice({
  name: "cart", //
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
      })

      .addCase(removeItemFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";

        const objIndex = state.cart.items.findIndex(
          (obj) => obj.productId === action.payload.productId
        );
        state.cart.items[objIndex].quantity -= action.payload.quantity;
        if (state.cart.items[objIndex].quantity === 0) {
          state.cart.items.splice(objIndex, 1);
        }
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addMatcher(
        isAnyOf(addItemToCart.fulfilled, fetchCartAsync.fulfilled),
        (state, action) => {
          state.status = "succeeded";

          state.cart = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(addItemToCart.rejected, fetchCartAsync.rejected),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const getCart = (state) => state.cart.cart;
export const getCartStatus = (state) => state.cart.status;
export const getCartError = (state) => state.cart.error;

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
