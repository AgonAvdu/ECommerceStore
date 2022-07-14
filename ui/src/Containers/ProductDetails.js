import {
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import { useParams } from "react-router";
import { variables } from "../hoc/Variables";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  fetchProduct,
  getProductsStatus,
} from "../store/productsSlice";
import { getCart, removeItemFromCart, addItemToCart } from "../store/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const productsStatus = useSelector(getProductsStatus);
  const product = useSelector(getProduct);
  const cart = useSelector(getCart);

  const image = product.imgUrl ? product.imgUrl : "placeholder.png";
  const price = product.price ? product.price.toFixed(2) : 99.99;

  let item = cart.items.find((item) => item.productId === product.id);

  let quantity = 0;
  if (item) {
    quantity = item.quantity;
  }

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);
  if (productsStatus === "loading") return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found</h3>;

  return (
    <Grid sx={{ marginTop: "1rem" }} container spacing={6}>
      <Grid item xs={6}>
        <CardMedia
          sx={{
            height: "35rem",
            backgroundSize: "contain",
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
              <TableRow>
                <TableCell>Quantity in Cart</TableCell>
                <TableCell>
                  <Grid container spacing={12}>
                    <Grid
                      sx={{
                        fontSize: "2rem",
                        display: "flex",
                        flexDirection: "row",
                      }}
                      item
                    >
                      <IconButton
                        sx={{
                          color:
                            quantity === 0 ? "action.disabled" : "error.main",
                        }}
                        onClick={
                          quantity > 0
                            ? () =>
                                dispatch(
                                  removeItemFromCart({
                                    productId: product.id,
                                    quantity: 1,
                                  })
                                )
                            : undefined
                        }
                      >
                        <RemoveIcon sx={{ fontSize: "1.5rem" }} />
                      </IconButton>
                      <Typography sx={{ fontSize: "1.5rem" }}>
                        {quantity}
                      </Typography>

                      <IconButton
                        sx={{
                          color:
                            quantity >= product.quantityInStock
                              ? "action.disabled"
                              : "success.main",
                        }}
                        onClick={
                          quantity < product.quantityInStock
                            ? () => dispatch(addItemToCart(product.id))
                            : undefined
                        }
                        color="success"
                      >
                        <AddIcon sx={{ fontSize: "1.5rem" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
