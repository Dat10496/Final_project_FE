import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Rating,
  Typography,
} from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { getItemDetail } from "../features/item/itemSlice";
import useAuth from "../hooks/useAuth";

function DetailPage() {
  const params = useParams();
  const itemId = params.id;
  const dispatch = useDispatch();
  const auth = useAuth();

  const { addCart, user, cart } = auth;

  const { isLoading, itemDetail } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getItemDetail({ itemId }));
  }, [dispatch, itemId]);

  const handleAddToCart = (itemDetail) => {
    if (!user) {
      alert("Login please");
    }

    const product = itemDetail;

    const check = cart.every((item) => {
      return item.product._id !== product._id;
    });

    if (check) {
      const userId = user._id;
      cart.push({ product, quantity: 1 });

      addCart({ cart, userId });
    } else {
      alert("This product has been added to cart");
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container
          sx={{
            display: "flex",
            mt: 3,
            minHeight: "100vh",
            minWidth: "100vh",
            justifyContent: "space-evenly",
          }}
        >
          <Card sx={{ maxHeight: 350, maxWidth: 350 }} name="media">
            <CardMedia
              component="img"
              height="350"
              width="350"
              image={itemDetail.image}
              alt={itemDetail.brand}
            />
          </Card>
          <Card sx={{ maxHeight: 350, maxWidth: 350 }} name="content">
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {itemDetail.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {itemDetail.details}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $ {itemDetail.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                TotalLeft {itemDetail.quantity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                TotalSoldOut {itemDetail.totalSold}
              </Typography>
              <Typography>Review</Typography>
              <Rating value={itemDetail.rating} precision={0.1} readOnly />
            </CardContent>
            <CardActions>
              <Button onClick={() => handleAddToCart(itemDetail)} size="small">
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Container>
      )}
    </>
  );
}

export default DetailPage;
