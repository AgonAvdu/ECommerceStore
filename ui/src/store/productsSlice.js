import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  isAnyOf,
} from "@reduxjs/toolkit";
import { PRODUCTS_URL } from "../hoc/Variables";
import axios from "axios";
import { createFormData } from "../util/util";

const productsAdapter = createEntityAdapter();

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: "name",
    searchTerm: "",
    categories: [],
  };
}

const initialState = {
  products: [],
  product: {},
  productsLoaded: false,
  filtersLoaded: false,
  categories: [],
  productParams: initParams(),
  metaData: null,
  status: "idle", //'idle' || 'loading' || 'succeeded' || 'failed'
  error: null,
};

function getAxiosParams(productParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm);
  if (productParams.categories.length > 0)
    params.append("categories", productParams.categories.toString());
  return params;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    const params = getAxiosParams(thunkApi.getState().products.productParams);
    const response = await axios.get(PRODUCTS_URL, { params });
    const pagination = response.headers["pagination"];
    thunkApi.dispatch(setMetaData(JSON.parse(pagination)));

    return response.data;
  }
);

export const fetchFilters = createAsyncThunk(
  "products/fetchFilters",
  async () => {
    const response = await axios.get(PRODUCTS_URL + "/filters");
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
    console.log("create Called");
    const formData = createFormData(product);
    const response = await axios.post(PRODUCTS_URL, formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
    return response.data;
  }
);
export const editProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    console.log("edit Called");

    const formData = createFormData(product);
    const response = await axios.put(PRODUCTS_URL, formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products", //
  initialState: initialState,
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
      };
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedProducts = action.payload;
        state.products = loadedProducts;
        state.productsLoaded = true;
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
        state.product = loadedProduct;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })

      .addCase(createProduct.rejected, (state, action) => {
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
      .addCase(editProduct.pending, (state) => {
        state.status = "loading";
      })

      .addCase(editProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFilters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.users = action.payload.users;
        state.filtersLoaded = true;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addMatcher(
        isAnyOf(editProduct.fulfilled, createProduct.fulfilled),
        (state, action) => {
          productsAdapter.upsertOne(state, action.payload);
        }
      );
  },
});

export const getAllProducts = (state) => state.products.products;
export const getProduct = (state) => state.products.product;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export const getFiltersLoaded = (state) => state.products.filtersLoaded;
export const getProductsLoaded = (state) => state.products.productsLoaded;
export const getAvailableCategories = (state) => state.products.categories;
export const getProductParams = (state) => state.products.productParams;
export const getMetaData = (state) => state.products.metaData;

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = productsSlice.actions;

export default productsSlice.reducer;
