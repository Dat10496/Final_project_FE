import { Box, Divider, Typography } from "@mui/material";
import { React, useEffect, useState, memo } from "react";

import Cart from "./Cart";
import PaypalButton from "./PaypalButton";
import useAuth from "../hooks/useAuth";
import InfoEmptyCart from "./InfoEmptyCart";

const styles = {
  boxCover: {
    position: "relative",
    right: { xs: "2%", sm: "" },
    display: { xs: "", md: "flex" },
    justifyContent: "space-between",
    maxWidth: 1200,
  },
  boxWrapPaypalBtn: {
    width: 320,
    height: 400,
    p: 2,
    m: 2,
  },
  boxWrapText: {
    display: "flex",
    justifyContent: "space-between",
    mb: 3,
    mt: 3,
  },
};

function PaymentCart() {
  const [total, setTotal] = useState(0);
  const auth = useAuth();
  const { cart } = auth;

  useEffect(() => {
    if (cart.length === 1) {
      setTotal((cart[0]?.product?.price * cart[0]?.quantity)?.toString());
    } else {
      const paypalValue = cart.reduce((prev, item) => {
        const currentValue = item?.product?.price * item?.quantity;
        return prev + currentValue;
      }, 0);

      setTotal(paypalValue.toString());
    }
  }, [cart, total]);

  if (cart.length === 0) return <InfoEmptyCart />;

  return (
    <>
      <Box sx={{ mt: 1 }}>
        <Box sx={styles.boxCover}>
          <Box name="cart">
            <Cart cart={cart} />
          </Box>

          <Box name="paypal-button" sx={styles.boxWrapPaypalBtn}>
            <Typography variant="h5">Summary</Typography>
            <Box sx={styles.boxWrapText}>
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="subtitle2"> {total}$</Typography>
            </Box>
            <Divider mb={1} />

            {/* Paypal Button */}
            <Box mt={2}>
              <PaypalButton value={total} auth={auth} />
            </Box>
            {/** **/}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default memo(PaymentCart);
