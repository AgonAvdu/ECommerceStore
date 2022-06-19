import { Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
// import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";

export default function ProductList({ products }) {
  return (
    <Grid sx={{ margin: "1rem 0 0 0 " }} container spacing={4}>
      {products.map((product) => (
        <Grid item xs={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
