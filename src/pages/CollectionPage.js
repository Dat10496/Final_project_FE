import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ItemCard from "../features/item/ItemCard";
import LoadingScreen from "../components/LoadingScreen";
import { getItems } from "../features/item/itemSlice";

function CollectionPage() {
  const [page, setPage] = useState(1);
  const { isLoading, items, totalPages } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const params = useParams();
  const { brand } = params;

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getItems({ page, brand }));
  }, [page, dispatch, brand]);

  return (
    <>
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
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {items.map((item) => (
              <Grid key={item._id} item xs={6} md={4} p={1}>
                <ItemCard item={item} key={item._id} />
              </Grid>
            ))}
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

export default CollectionPage;
