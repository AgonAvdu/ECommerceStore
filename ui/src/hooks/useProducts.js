import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  getProductsLoaded,
  fetchProducts,
  getFiltersLoaded,
  fetchFilters,
  getAllProducts,
  getAvailableCategories,
  getMetaData,
} from "../store/productsSlice";

export default function useProducts() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const productsLoaded = useSelector(getProductsLoaded);
  const filtersLoaded = useSelector(getFiltersLoaded);
  const availableCategories = useSelector(getAvailableCategories);
  const metaData = useSelector(getMetaData);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProducts());
    }
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFilters());
    }
  }, [filtersLoaded, dispatch]);

  return {
    products,
    productsLoaded,
    filtersLoaded,
    availableCategories,
    metaData,
  };
}
