import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function ItemCard({ item }) {
  const itemId = item._id;

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/items/${itemId}`)}
      sx={{ maxWidth: 250, maxHeight: 350, p: 0.5 }}
    >
      <CardMedia
        sx={{ borderRadius: 1.2 }}
        component="img"
        height="180"
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
        <Typography variant="subtitle2" color="palette.primary.lighter">
          {`$${item.price}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ItemCard;
