import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  order: {},
  status: "idle", //'idle' || 'loading' || 'succeeded' || 'failed'
  error: null,
};

export const fetchOrdersAsync = createAsyncThunk(
  "order/fetchOrderAsync",
  async (_, thunkAPI) => {},
  {}
);
export const fetchOrderWithId = createAsyncThunk(
  "order/fetchOrderWithId",
  async (id, thunkAPI) => {},
  {}
);
export const creteOrder = createAsyncThunk(
  "order/createOrder",
  async (value, thunkAPI) => {},
  {}
);

export const orderSlice = createSlice({
  name: "order", //
  initialState: initialState,
  reducers: {},
  extraReducers() {},
});

export default orderSlice.reducer;
