import { Box, Button, Card, Divider, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../features/item/itemSlice";

function Cart({ items }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.item);

  const handleRemoveItem = (item) => {
    const index = cart.indexOf(item);
    dispatch(removeItemFromCart({ item, index }));
  };
  return (
    <>
      <Box display="flex" flexDirection="column">
        {items.map((item) => (
          <>
            <Card key={item._id}>
              <Typography>price {item.price}</Typography>
              <Button onClick={() => handleRemoveItem(item)}>Remove</Button>
            </Card>
          </>
        ))}
      </Box>
    </>
  );
}

export default Cart;
