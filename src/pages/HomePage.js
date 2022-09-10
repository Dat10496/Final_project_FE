import { Box, Container, Grid } from "@mui/material";
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";
import { getItems } from "../features/item/itemSlice";

function HomePage() {
  const [page, setPage] = useState(1);
  const { isLoading, items } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems({ page }));
  }, [page, dispatch]);
  // console.log(items);
  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "100vh",
        mt: 2,
        maxWidth: "100vh",
        flexWrap: "wrap",
        justifyContent: "flex-end",
      }}
    >
      {items.map((item) => (
        <Grid item xs={6} md={4} p={1}>
          <ItemCard item={item} key={item._id} />
        </Grid>
      ))}
    </Container>
  );
}

export default HomePage;
