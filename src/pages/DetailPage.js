import {
  Box,
  Breadcrumbs,
  Card,
  CardMedia,
  Container,
  Divider,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { getItemDetail } from "../features/item/itemSlice";
import { DOMAIN_URL } from "../app/config";
import ImgSold from "../images/sold.png";
import AddToCartButton from "../components/AddToCartButton";

function DetailPage() {
  const params = useParams();
  const itemId = params.id;
  const dispatch = useDispatch();

  const { isLoading, itemDetail } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getItemDetail({ itemId }));
  }, [dispatch, itemId]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Breadcrumbs m={1.5} separator="›" aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              SNEAKER STORE
            </Link>
            <Typography color="text.primary">{itemDetail.brand}</Typography>
          </Breadcrumbs>

          <Container
            sx={{
              display: { xs: "", sm: "flex" },
              mt: 3,
              p: 1,
              minHeight: "100vh",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ height: 500, width: 500 }}>
              <Card
                sx={{
                  maxWidth: { xs: 400, sm: 500 },
                  maxHeight: { xs: 400, sm: 500 },
                }}
                name="media"
              >
                <CardMedia
                  component="img"
                  height="450"
                  width="450"
                  image={`${DOMAIN_URL}${itemDetail.image}`}
                  alt={itemDetail.brand}
                />
              </Card>
            </Box>

            <Box sx={{ width: 500, height: 500, p: 1, mr: 5 }}>
              <Typography gutterBottom variant="h3" component="div">
                {itemDetail.brand}
              </Typography>
              <Rating value={itemDetail.rating} precision={0.1} readOnly />
              <Typography variant="h6" color="text">
                $ {itemDetail.price}
              </Typography>
              <Divider sx={{ mb: 2 }} light />

              <Typography variant="body1" color="text">
                {itemDetail.details}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Box sx={{ height: 40, width: 40 }}>
                  <img src={ImgSold} alt="soldImage" width="100%" />
                </Box>
                <Typography variant="h6" color="text.secondary">
                  {itemDetail.totalSold}
                </Typography>
                <Typography sx={{ ml: 1 }} variant="subtitle1" color="#cc571f">
                  Product Sold
                </Typography>
              </Box>

              <Box mt={2}>
                <AddToCartButton itemDetail={itemDetail} />
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default DetailPage;
