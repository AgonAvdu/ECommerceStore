import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { variables } from "../../hoc/Variables";

import { Box } from "@mui/system";
import { addItemToCart, removeItemFromCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

export default function BasketTable({ items, isCart }) {
  console.log(items[0]);
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sale</TableCell>
            <TableCell align="center">Quantity</TableCell>

            <TableCell align="left">Subtotal</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    alt="product"
                    width="50px"
                    height="50px"
                    src={variables.PHOTO_URL + item.imgUrl}
                  />
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${item.price.toFixed(2)}</TableCell>
              <TableCell align="right">{item.sale}%</TableCell>

              <TableCell align="center">
                {isCart && (
                  <IconButton
                    onClick={() =>
                      dispatch(
                        removeItemFromCart({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                    color="error"
                  >
                    <RemoveIcon />
                  </IconButton>
                )}

                {item.quantity}
                {isCart && (
                  <IconButton
                    sx={{
                      color:
                        item.quantity >= item.productQuantity
                          ? "action.disabled"
                          : "success.main",
                    }}
                    onClick={
                      item.quantity < item.productQuantity
                        ? () => dispatch(addItemToCart(item.productId))
                        : undefined
                    }
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="left">
                {(item.price * (1 - item.sale / 100) * item.quantity).toFixed(
                  2
                )}
                $
              </TableCell>
              {isCart && (
                <TableCell align="right">
                  <LoadingButton
                    onClick={() =>
                      dispatch(
                        removeItemFromCart({
                          productId: item.productId,
                          quantity: item.quantity,
                        })
                      )
                    }
                    color="error"
                  >
                    <DeleteIcon />
                  </LoadingButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
