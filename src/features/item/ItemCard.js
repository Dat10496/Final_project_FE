import { Box, CardContent, Rating, Typography } from "@mui/material";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DOMAIN_URL } from "../../app/config";
import "./itemStyle.css";
import AddToCartButton from "../../components/AddToCartButton";

function ItemCard({ item }) {
  const [display, setDisplay] = useState("not-displayed");

  const itemId = item._id;
  const navigate = useNavigate();

  const showButton = (e) => {
    e.preventDefault();
    setDisplay("displayed");
  };
  const hideButton = (e) => {
    e.preventDefault();
    setDisplay("not-displayed");
  };

  return (
    <>
      <Box
        sx={{
          width: 220,
          height: 250,
          "&:hover": {
            opacity: 0.9,
            cursor: "pointer",
          },
        }}
      >
        <Box
          onMouseOver={(e) => showButton(e)}
          onMouseLeave={(e) => hideButton(e)}
          component="div"
        >
          <Box
            onClick={() => navigate(`/items/${itemId}`)}
            sx={{
              boxShadow: 3,
              borderRadius: 1.2,
              zIndex: "1",
              "&:hover": {
                border: "1px solid #FF8243",
                boxShadow: 5,
              },
            }}
            component="img"
            height="220px"
            width="220px"
            src={`${DOMAIN_URL}${item.image}`}
            alt={item.brand}
          />
          <AddToCartButton itemDetail={item} display={display} />
        </Box>
      </Box>

      <CardContent
        sx={{
          width: 220,
          height: 250,
        }}
      >
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
