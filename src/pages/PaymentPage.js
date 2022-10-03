import { Box, Container, Divider, Typography } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cart from "../components/Cart";
import Paypal from "../components/Paypal";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function PaymentPage() {
  const { cart } = useSelector((state) => state.item);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        const currentValue = item.product.price * item.quantity;
        return prev + currentValue;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

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
            <Paypal toPay={total} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default PaymentPage;
