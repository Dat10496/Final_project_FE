import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleQtyOfItem,
  removeItemFromCart,
} from "../features/item/itemSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const QTY_ITEMS = ["1", "2", "3", "4", "5"];

function Cart({ cart }) {
  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    const index = cart.indexOf(item);
    dispatch(removeItemFromCart({ item, index }));
  };

  const handleQuantity = (product, quantity) => {
    dispatch(handleQtyOfItem({ product, quantity }));
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
                    <Select defaultValue={1}>
                      {QTY_ITEMS.map((quantity) => (
                        <MenuItem
                          onClick={() => handleQuantity(product, quantity)}
                          value={quantity}
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
                {" "}
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
