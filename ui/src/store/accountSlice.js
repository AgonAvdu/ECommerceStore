import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { ACCOUNT_URL } from "../hoc/Variables";
import axios from "axios";
import { setCart } from "./cartSlice";
// import { store } from "./store";

axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const token = storageUser?.Token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const initialState = {
  account: null,
  status: "idle", //'idle' || 'loading' || 'succeeded' || 'failed'
  error: null,
  registerError: [],
  test: 1,
};

export const loginUser = createAsyncThunk(
  "account/login",
  async (data, thunkAPI) => {
    try {
      const userDto = await axios.post(ACCOUNT_URL + "/login", data);
      const { Cart, ...user } = userDto.data;
      if (Cart) thunkAPI.dispatch(setCart(Cart));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

let storageUser;

export const fetchCurrentUser = createAsyncThunk(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    console.log("called");
    storageUser = JSON.parse(localStorage.getItem("user"));
    try {
      const userDto = await axios.get(ACCOUNT_URL + "/currentUser");
      const { Cart, ...user } = userDto.data;
      if (Cart) thunkAPI.dispatch(setCart(Cart));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account", //
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      state.account = null;

      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.account = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
    });
    builder.addMatcher(
      isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.account = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(loginUser.rejected), (state, action) => {});
  },
});

export const getUser = (state) => state.account.account;

export const { signOut, setUser } = accountSlice.actions;

export default accountSlice.reducer;
