import { TableCell, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { getCart } from "../../store/cartSlice";
const CartSummary = ({ sum }) => {
  const cart = useSelector(getCart);
  if (sum === undefined)
    sum =
      cart?.items.reduce(
        (sum, item) => sum + item.price * (1 - item.sale / 100) * item.quantity,
        0
      ) ?? 0;
  const deliveryFee = sum > 100 ? 0 : 5;

  return (
    <>
      <TableRow>
        <TableCell rowSpan={3} />
        <TableCell colSpan={3}>Sum</TableCell>
        <TableCell align="center">{sum.toFixed(2)}$</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Delivery Fee</TableCell>
        <TableCell colSpan={2} align="right"></TableCell>
        <TableCell align="center">{deliveryFee}$</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell align="center">{(sum + deliveryFee).toFixed(2)}$</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={6}
          sx={{
            fontStyle: "italic",
            letterSpacing: "1px",
          }}
        >
          *Orders over $100 qualify for free delivery
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartSummary;
