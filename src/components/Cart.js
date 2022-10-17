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
import { DOMAIN_URL } from "../app/config";

const QTY_ITEMS = [1, 2, 3, 4, 5];

function Cart({ cart }) {
  const auth = useAuth();
  const { addCart } = auth;

  const handleRemoveItem = (product) => {
    const index = cart.indexOf(product);
    cart.splice(index, 1);

    addCart({ cart });
  };

  const handleQuantity = (product, quantity) => {
    cart.forEach((item) => {
      if (item.product._id === product.product._id) {
        item.quantity = quantity;
      }
    });

    addCart({ cart });

    window.location.reload();
  };

  return (
    <>
      {cart.map((product) => (
        <Box key={product.product._id}>
          <Box
            sx={{ display: "flex", alignItems: "center", p: 1 }}
            key={product.product._id}
          >
            <Box
              component="img"
              height="120px"
              width="120px"
              src={`${DOMAIN_URL}${product.product.image}`}
            />
            <Box sx={{ minHeight: "20vh", width: "600px", ml: 3 }}>
              <Typography variant="subtitle2">
                {product.product.brand}
              </Typography>
              <Typography variant="body2">{product.product.details}</Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">Quantity</Typography>
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

              <Button sx={{ color: "primary", ml: -2 }}>
                <DeleteOutlineIcon onClick={() => handleRemoveItem(product)} />
              </Button>
            </Box>

            <Typography>
              {product.product.price * product.quantity} $
            </Typography>
          </Box>
          <Divider variant="middle" />
        </Box>
      ))}
    </>
  );
}

export default Cart;
