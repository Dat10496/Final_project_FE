import { Box, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DOMAIN_URL } from "../../app/config";

function ItemCard({ item }) {
  const itemId = item._id;

  const navigate = useNavigate();

  return (
    <>
      <Box
        onClick={() => navigate(`/items/${itemId}`)}
        sx={{
          maxWidth: 220,
          maxHeight: 250,
          "&:hover": {
            opacity: [0.9, 0.8, 0.7],
            cursor: "pointer",
          },
        }}
      >
        <CardMedia
          sx={{ borderRadius: 1.2 }}
          component="img"
          height="220"
          width="100%"
          src={`${DOMAIN_URL}${item.image}`}
          alt={item.brand}
        />
      </Box>

      <CardContent>
        <Typography fontStyle="bold" gutterBottom variant="h5" component="div">
          {item.brand}
        </Typography>
        <Rating size="small" value={item.rating} precision={0.1} readOnly />
        <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
          {item.details}
        </Typography>
        <Typography variant="h6" color="#e57373">
          {item.price} $
        </Typography>
      </CardContent>
    </>
  );
}

export default ItemCard;
