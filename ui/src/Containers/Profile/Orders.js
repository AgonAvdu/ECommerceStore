import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import { ORDER_URL } from "../../hoc/Variables";
import OrderDetails from "./OrderDetails";

export default function Orders() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

  useEffect(() => {
    axios
      .get(ORDER_URL)
      .then((response) => {
        console.log(response);
        setOrders(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  console.log(orders);

  if (loading) return <LoadingComponent message="Loading orders..." />;

  if (selectedOrderNumber > 0) {
    console.log(selectedOrderNumber);
    return (
      <OrderDetails
        order={orders?.find((o) => o.id === selectedOrderNumber)}
        setSelectedOrder={setSelectedOrderNumber}
      />
    );
  }
  return (
    <Container sx={{ mt: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order number</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Order Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="order">
                  {order.id}
                </TableCell>
                <TableCell align="right">{order.total.toFixed(2)}$</TableCell>
                <TableCell align="right">
                  {order.orderDate.split("T")[0]}
                </TableCell>
                <TableCell align="right">{order.orderStatus}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      setSelectedOrderNumber(order.id);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
