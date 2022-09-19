import { Typography } from "@mui/material";
import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "../components/Cart";

function PaymentPage() {
  const { cart, totalPrice } = useSelector((state) => state.item);
  console.log(cart);
  useEffect(() => {}, [cart, totalPrice]);

  return (
    <>
      <Cart items={cart} />
      <Typography>total {totalPrice}</Typography>
    </>
  );
}

export default PaymentPage;
