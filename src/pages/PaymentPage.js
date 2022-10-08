import { Box, Container, Divider, Typography } from "@mui/material";
import { React, useEffect, useState } from "react";
import Cart from "../components/Cart";
import PaypalButton from "../components/PaypalButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "@mui/material";
import useAuth from "../hooks/useAuth";

function PaymentPage() {
  const [total, setTotal] = useState(0);
  const auth = useAuth();

  const { cart } = auth;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        const currentValue = item.product.price * item.quantity;
        return prev + currentValue;
      }, 0);

      setTotal(total);
    };
    getTotal();
  }, [cart, total]);

  if (cart.length === 0) return <Typography>Empty Cart</Typography>;
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          SNEAKER STORE
        </Link>

        <Typography color="text.primary"> Cart</Typography>
      </Breadcrumbs>
      <Container
        sx={{
          display: "flex",
          minWidth: "100vh",
          mt: 2,
          justifyContent: "space-evenly",
        }}
      >
        <Cart cart={cart} />
        <Box
          sx={{
            width: "300px",
            height: "400px",
            p: 1,
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
            <PaypalButton total={total} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default PaymentPage;
