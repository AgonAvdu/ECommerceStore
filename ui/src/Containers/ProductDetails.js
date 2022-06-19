import {
  CardMedia,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { variables } from "../hoc/Variables";
import {
  getProduct,
  fetchProduct,
  getProductsStatus,
} from "../store/productsSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productsStatus = useSelector(getProductsStatus);
  const product = useSelector(getProduct);

  const image = product.imgUrl ? product.imgUrl : "placeholder.png";
  const price = product.price ? product.price.toFixed(2) : 99.99;

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);
  if (productsStatus === "loading") return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found</h3>;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <CardMedia
          sx={{
            height: "35rem",
            backgroundSize: "contain",
            border: "1px solid red",
          }}
          image={`${variables.PHOTO_URL}/${image} `}
          // src={variables.PHOTO_URL + product.imgUrl}
          title={product.name}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${price}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>{product.categoryId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sale</TableCell>
                <TableCell>{product.sale}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rate</TableCell>
                <TableCell>{product.rate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
