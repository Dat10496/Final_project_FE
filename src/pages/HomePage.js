import { Container, Grid, Pagination, Stack } from "@mui/material";
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../features/item/ItemCard";
import LoadingScreen from "../components/LoadingScreen";
import ProductFilter from "../components/ProductFilter";
import { getItems } from "../features/item/itemSlice";

function HomePage() {
  const [page, setPage] = useState(1);
  const { isLoading, items, totalPages } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getItems({ page }));
  }, [page, dispatch]);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          minHeight: "100vh",
          mt: 3,
          maxWidth: "100vh",
        }}
      >
        <Stack>
          <ProductFilter page={page} />
        </Stack>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Grid container spacing={2} mt={1}>
              {items.map((item) => (
                <Grid key={item._id} item xs={6} md={4} lg={3}>
                  <ItemCard item={item} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          m: 1,
        }}
        spacing={1}
      >
        <Pagination
          count={totalPages}
          siblingCount={0}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </>
  );
}

export default HomePage;
