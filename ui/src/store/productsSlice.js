import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { variables } from "../hoc/Variables";
import axios from "axios";

const PRODUCTS_URL = variables.API_URL + "product";

const initialState = {
  products: [],
  product: {},
  status: "idle", //'idle' || 'loading' || 'succeeded' || 'failed'
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(PRODUCTS_URL);
    return response.data;
  }
);
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id) => {
    const response = await axios.get(PRODUCTS_URL + `/${id}`);
    return response.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    await axios.delete(`${PRODUCTS_URL}/${id}`);
    return id;
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    await axios.post(PRODUCTS_URL, product);
    return product;
  }
);
export const editProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    await axios.put(PRODUCTS_URL, product);
    return product;
  }
);

export const productsSlice = createSlice({
  name: "products", //
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedProducts = action.payload;
        state.products = loadedProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedProduct = action.payload;
        state.product = loadedProduct[0];
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const filteredArray = state.products.filter(
          (product) => !(product.id === action.payload)
        );
        state.products = filteredArray;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const objIndex = state.products.findIndex(
          (obj) => obj.id === action.payload.id
        );
        state.products[objIndex] = action.payload;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllProducts = (state) => state.products.products;
export const getProduct = (state) => state.products.product;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer;
