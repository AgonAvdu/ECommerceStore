import { Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";
import { useSelector } from "react-redux";
import { getProductsLoaded } from "../../../store/productsSlice";
// import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";

export default function ProductList({ products }) {
  const productsLoaded = useSelector(getProductsLoaded);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
