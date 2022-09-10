import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function ItemCard({ item }) {
  console.log(item);
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 350, p: 0.5 }}>
      <CardMedia
        sx={{ borderRadius: 1.2 }}
        component="img"
        height="140"
        src={item.image}
        alt={item.brand}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.details}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ItemCard;
