import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CartSummary from "../../components/Cart/CartSummary";
import CartTable from "../../components/Cart/CartTable";

export default function OrderDetailed({ order, setSelectedOrder }) {
  console.log(order);
  const sum =
    order.orderItems.reduce(
      (sum, item) => sum + item.price * (1 - item.sale / 100) * item.quantity,
      0
    ) ?? 0;
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} gutterBottom variant="h4">
          Order# {order.id} - {order.orderStatus}
        </Typography>
        <Button
          onClick={() => setSelectedOrder(0)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Back to orders
        </Button>
      </Box>
      <CartTable items={order.orderItems} isBasket={false} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <CartSummary sum={sum} />
        </Grid>
      </Grid>
    </>
  );
}
