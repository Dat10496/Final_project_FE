import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    minWidth: { xs: "50vh", sm: "100vh" },
    height: "80vh",
    mt: 2,
    p: 1,
  },
  box: {
    maxWidth: { xs: 400, sm: "none" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "success.lighter",
    borderRadius: 1,
    p: 1,
  },
};

function InfoEmptyCart() {
  const navigate = useNavigate();

  return (
    <>
      <Container sx={styles.container}>
        <Box sx={styles.box}>
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
}

export default InfoEmptyCart;
