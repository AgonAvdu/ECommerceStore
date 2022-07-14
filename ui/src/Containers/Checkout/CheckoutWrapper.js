import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";

import React, { useState } from "react";
import Checkout from "./Checkout";
import { useEffect } from "react";
import axios from "axios";
import { PAYMENTS_URL } from "../../hoc/Variables";
import { getCart, setCart } from "../../store/cartSlice";
import LoadingComponent from "../../components/Loading/LoadingComponent";

const stripePromise = loadStripe(
  "pk_test_51LHyQwEVzR0DMs8hCEjyIIgiJzy3Tx0GyqX44fD4tSnDMLOusnFbPaegYd3JtDQLGkikQUzlOfIiD9hKRucNfVoi00TbljecaT"
);

export default function CheckoutWrapper() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const cart = useSelector(getCart);
  console.log(cart);
  useEffect(() => {
    axios
      .post(PAYMENTS_URL, {})
      .then((response) => {
        dispatch(setCart(response.data));
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, [dispatch]);

  if (loading) return <LoadingComponent message="Loading checkout..." />;

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
