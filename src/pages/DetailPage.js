import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  Divider,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import { ToastContainer } from "react-toastify";

import LoadingScreen from "../components/LoadingScreen";
import { getItemDetail } from "../features/item/itemSlice";
import { DOMAIN_URL } from "../app/config";
import ImgSold from "../images/sold.png";


const styles = {
  boxCover: {
    display: { xs: "", sm: "flex" },
    mt: 3,
    p: 1,
    minHeight: "100vh",
    justifyContent: "space-between",
  },
  boxWrap: {
    display: { xs: "", sm: "flex" },
    mt: 3,
    p: 1,
    minHeight: "100vh",
    justifyContent: "space-between",
  },
  card: {
    width: { xs: 350, sm: 500 },
    height: { xs: 350, sm: 500 },
  },
  boxWrapContent: {
    height: { xs: 350, sm: 500 },
    width: { xs: 350, sm: 500 },
    p: 1,
    mr: 5,
  },
  boxWrapTypoSold: {
    display: "flex",
    alignItems: "center",
    mt: 1,
  },
};

function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const itemId = params.id;
  const { isLoading, itemDetail } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getItemDetail({ itemId }));
  }, [dispatch, itemId]);

  return (
    <Container>
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

          <Box sx={styles.boxCover}>
            <Box sx={styles.boxWrap}>
              <Card sx={styles.card} name="media">
                <Box
                  component="img"
                  height="100%"
                  width="100%"
                  src={`${DOMAIN_URL}${itemDetail.image}`}
                  alt={itemDetail.brand}
                />
              </Card>
            </Box>

            <Box sx={styles.boxWrapContent}>
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

              <Box sx={styles.boxWrapTypoSold}>
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

              <Box mt={5}>
                <AddToCartButton itemDetail={itemDetail} />
              </Box>
            </Box>
            <ToastContainer />
          </Box>
        </>
      )}
    </Container>
  );
}

export default DetailPage;
