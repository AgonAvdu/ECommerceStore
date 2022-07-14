import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CartSummary from "../../components/Cart/CartSummary";
import CartTable from "../../components/Cart/CartTable";
import { useSelector } from "react-redux";
import { getCart } from "../../store/cartSlice";
export default function Review() {
  const cart = useSelector(getCart);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {cart && <CartTable items={cart.items} isCart={false} />}
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <CartSummary />
        </Grid>
      </Grid>
    </>
  );
}
