import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { React, useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";

import Cart from "./Cart";
import PaypalButton from "./PaypalButton";
import useAuth from "../hooks/useAuth";

function PaymentCart() {
  const navigate = useNavigate();
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

  if (cart.length === 0)
    return (
      <>
        <Container
          sx={{
            minWidth: { xs: "50vh", sm: "100vh" },
            height: "80vh",
            mt: 2,
            p: 1,
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: 400, sm: "none" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "success.lighter",
              borderRadius: 1,
              p: 1,
            }}
          >
            <Typography variant="h4">Your Cart is Empty</Typography>
            <Button
              sx={{ mt: 1 }}
              color="success"
              onClick={() => navigate("/")}
              variant="outlined"
            >
              Back to Shopping
            </Button>
          </Box>
        </Container>
      </>
    );

  return (
    <>
      <Box sx={{ mt: 1 }}>
        <Box
          sx={{
            position: "relative",
            right: { xs: "2%", sm: "" },
            display: { xs: "", md: "flex" },
            justifyContent: "space-between",
            maxWidth: 1200,
          }}
        >
          <Box name="cart">
            <Cart cart={cart} />
          </Box>

          <Box
            name="paypal-button"
            sx={{
              width: 320,
              height: 400,
              p: 2,
              m: 2,
            }}
          >
            <Typography variant="h5">Summary</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
                mt: 3,
              }}
            >
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="subtitle2"> {total}$</Typography>
            </Box>
            <Divider mb={1} />

            {/* Paypal Button */}
            <Box mt={2}>
              <PaypalButton value={total} auth={auth} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default memo(PaymentCart);
