import { Add } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 100,
  backgroundColor: "#D6E4FF",
  border: "1px solid #9e9e9e",
  borderRadius: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  p: 4,
};

const AddToCartButton = ({ display, itemDetail }) => {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openAlertAddToCart, setOpenAlertAddToCart] = useState(false);
  const navigate = useNavigate();

  const auth = useAuth();
  const { addCart, user, cart } = auth;

  const handleModalLoginClose = () => setOpenModalLogin(false);
  const handleAlertAddToCartClose = () => setOpenAlertAddToCart(false);

  const handleAddToCart = () => {
    if (!user) {
      setOpenModalLogin(true);
    } else {
      const product = itemDetail;

      const check = cart.every((item) => {
        return item.product._id !== product._id;
      });

      if (check) {
        const userId = user?._id;
        cart.push({ product, quantity: 1 });

        addCart({ cart, userId });

        toast.success("Added to Cart", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setOpenAlertAddToCart(true);
      }
    }
  };

  return (
    <Box className={display}>
      <Button
        onClick={handleAddToCart}
        size="small"
        startIcon={<Add />}
        style={{
          backgroundColor: "#bf360c",
          position: "absolute",
          transform: "translate(0%, -20%)",
          duration: 5,
        }}
        sx={{ width: 220 }}
        variant="contained"
      >
        Add To Cart
      </Button>

      <Modal open={openModalLogin} onClose={handleModalLoginClose}>
        <Box style={style}>
          <Typography color="success.dark" variant="h6">
            Please Login & Add to Cart
          </Typography>
          <Button
            onClick={() => navigate("/login")}
            size="small"
            variant="outlined"
          >
            Login
          </Button>
        </Box>
      </Modal>
      <Modal open={openAlertAddToCart} onClose={handleAlertAddToCartClose}>
        <Box style={style}>
          <Typography color="success.dark" variant="subtitle1">
            This product has been in your cart already
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddToCartButton;
