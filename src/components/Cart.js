import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { React } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useAuth from "../hooks/useAuth";

const QTY_ITEMS = [1, 2, 3, 4, 5];

function Cart({ cart }) {
  const auth = useAuth();
  const { addCart, user } = auth;
  const userId = user._id;

  const handleRemoveItem = (product) => {
    const index = cart.indexOf(product);
    cart.splice(index, 1);

    addCart({ cart, userId });
  };

  const handleQuantity = (product, quantity) => {
    cart.forEach((item) => {
      console.log(item.product._id);
      if (item.product._id === product.product._id) {
        item.quantity = quantity;
      }
    });

    addCart({ cart, userId });
  };

  return (
    <>
      <Box display="flex" flexDirection="column">
        {cart.map((product) => (
          <>
            <Box
              sx={{ display: "flex", alignItems: "center", p: 1 }}
              key={product.product._id}
            >
              <Box
                component="img"
                height="120px"
                width="120px"
                src={product.product.image}
              />
              <Box sx={{ minHeight: "20vh", width: "600px", ml: 3 }}>
                <Typography> {product.product.brand}</Typography>
                <Typography> {product.product.details}</Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Quantity</Typography>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 30 }}>
                    <Select value={product.quantity}>
                      {QTY_ITEMS.map((quantity) => (
                        <MenuItem
                          onClick={() => handleQuantity(product, quantity)}
                          value={quantity}
                          key={quantity.toString()}
                        >
                          {quantity}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Button sx={{ color: "black", ml: -2 }}>
                  <DeleteOutlineIcon
                    onClick={() => handleRemoveItem(product)}
                  />
                </Button>
              </Box>

              <Typography>
                {product.product.price * product.quantity} $
              </Typography>
            </Box>
            <Divider variant="middle" />
          </>
        ))}
      </Box>
    </>
  );
}

export default Cart;
