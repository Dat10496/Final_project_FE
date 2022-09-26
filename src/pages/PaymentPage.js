import { Typography } from "@mui/material";
import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "../components/Cart";
import Paypal from "../components/Paypal";

function PaymentPage() {
  const { cart, totalPrice } = useSelector((state) => state.item);
  console.log(cart);
  useEffect(() => {}, [cart, totalPrice]);

  return (
    <>
      <Cart items={cart} />
      <Typography>total {totalPrice}</Typography>
      {/* Paypal Button */}
      <Paypal toPay={totalPrice} />
    </>
  );
}

export default PaymentPage;
