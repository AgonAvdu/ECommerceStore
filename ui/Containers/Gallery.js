import { useSelector } from "react-redux";

import LoadingComponent from "../components/Loading/LoadingComponent";
import ProductList from "../components/Product/ProductList/ProductList";

import { Container } from "@mui/material";
import { getAllProducts, getProductsStatus } from "../store/productsSlice";

function Gallery() {
  const productsStatus = useSelector(getProductsStatus);
  const products = useSelector(getAllProducts);

  if (productsStatus === "loading")
    return <LoadingComponent message="Loading products..." />;
  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
}

export default Gallery;
