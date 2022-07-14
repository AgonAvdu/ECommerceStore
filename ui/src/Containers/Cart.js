import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getCart, getCartStatus, getCartError } from "../store/cartSlice";
import LoadingComponent from "../components/Loading/LoadingComponent";
import { Container } from "@mui/material";
import CartSummary from "../components/Cart/CartSummary";
import CartTable from "../components/Cart/CartTable";

import { Link } from "react-router-dom";

const Cart = () => {
  const cartStatus = useSelector(getCartStatus);
  const cartError = useSelector(getCartError);
  const cart = useSelector(getCart);

  if (cartStatus === "loading")
    return <LoadingComponent component={Container} message="Loading Cart" />;
  if (cartStatus === "failed")
    return (
      <Typography component={Container} variant="h3">
        {cartError}
      </Typography>
    );

  if (!cart?.items || cart.items.length === 0)
    return (
      <Typography component={Container} variant="h3">
        Your cart is empty.
      </Typography>
    );

  return (
    <Container sx={{ marginTop: "3rem" }}>
      <>
        <CartTable items={cart.items} isCart={true} />
        <Grid container>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <CartSummary />
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              size="large"
              fullWidth
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </>
    </Container>
  );
};
export default Cart;
