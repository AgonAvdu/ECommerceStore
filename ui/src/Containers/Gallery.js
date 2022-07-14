import { useSelector, useDispatch } from "react-redux";
import ProductList from "../components/Product/ProductList/ProductList";
import ProductSearch from "../components/ProductSearch/ProductSearch";
import AppPagination from "../components/Pagination/AppPagination";
import { Container, Grid, Paper } from "@mui/material";
import LoadingComponent from "../components/Loading/LoadingComponent";
import {
  getProductParams,
  setProductParams,
  setPageNumber,
} from "../store/productsSlice";

import FormControl from "@mui/material/FormControl";
import RadioButton from "../components/RadioButton/RadioButton";
import CheckBox from "../components/Checkbox/Checkbox";
import useProducts from "../hooks/useProducts";

function Gallery() {
  const dispatch = useDispatch();
  // const products = useSelector(getAllProducts);
  const productParams = useSelector(getProductParams);
  // const filtersLoaded = useSelector(getFiltersLoaded);
  // const availableCategories = useSelector(getAvailableCategories);
  // const metaData = useSelector(getMetaData);
  const { products, filtersLoaded, availableCategories, metaData } =
    useProducts();

  const sortOptions = [
    {
      value: "name",
      label: "Alphabetical",
    },
    {
      value: "priceDesc",
      label: "Price - High to low",
    },
    {
      value: "price",
      label: "Price - Low to high",
    },
  ];
  if (!filtersLoaded) return <LoadingComponent message="Loading..." />;
  return (
    <Container>
      <Grid sx={{ margin: "1rem 0 0 0 " }} container spacing={4}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <FormControl>
              <RadioButton
                selectedValue={productParams.orderBy}
                options={sortOptions}
                onChange={(e) =>
                  dispatch(setProductParams({ orderBy: e.target.value }))
                }
              />
            </FormControl>
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckBox
              items={availableCategories}
              checked={productParams.categories}
              onChange={(items) =>
                dispatch(setProductParams({ categories: items }))
              }
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9} sx={{ mb: 2 }}>
          {metaData && (
            <AppPagination
              metaData={metaData}
              onPageChange={(page) =>
                dispatch(setPageNumber({ pageNumber: page }))
              }
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Gallery;
