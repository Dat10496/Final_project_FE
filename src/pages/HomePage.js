import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { React, useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../features/item/ItemCard";
import LoadingScreen from "../components/LoadingScreen";
import ProductFilter from "../components/ProductFilter";
import { getItems } from "../features/item/itemSlice";
import ProductSort from "../components/ProductSort";
import ProductSearch from "../components/ProductSearch";
import HomeIcon from "@mui/icons-material/Home";
import useAuth from "../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function HomePage() {
  const dispatch = useDispatch();
  const auth = useAuth();

  const [page, setPage] = useState(1);
  const [controlPage, setControlPage] = useState(false);

  const [searchParams] = useSearchParams();
  const googleId = searchParams.get("googleId");

  const { isLoading, items, totalPages } = useSelector((state) => state.item);

  const { loginWithGoogle } = auth;

  const handleChangePage = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  useEffect(() => {
    if (page === totalPages) {
      setControlPage(true);
    }
  }, [page, totalPages]);

  useEffect(() => {
    dispatch(getItems({ page }));
  }, [page, dispatch]);

  useEffect(() => {
    if (googleId) {
      loginWithGoogle({ googleId });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 1,
            maxWidth: "200vh",
          }}
        >
          <Breadcrumbs m={1} separator="›" aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <HomeIcon fontSize="medium" />
              SNEAKER STORE
            </Link>
            <Typography color="#212121">Home</Typography>
          </Breadcrumbs>

          <Box
            sx={{
              display: { xs: "", md: "flex" },
              justifyContent: "flex-end",
              mr: 3,
            }}
          >
            <ProductSearch />
            <ProductSort />
          </Box>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }}>
          <Stack sx={{ mr: 2, mt: 2 }}>
            <ProductFilter page={page} />
          </Stack>

          <Stack>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {items.length === 0 ? (
                  <>
                    <Box m={2}>
                      <Alert severity="error">There is no product match</Alert>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ flexGrow: 1, ml: 4 }}>
                    <Grid container spacing={2} mt={1}>
                      {items.map((item) => (
                        <Grid key={item._id} item xs={12} md={4} lg={3}>
                          <ItemCard item={item} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </>
            )}
          </Stack>
        </Stack>

        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            m: 1,
          }}
          spacing={1}
        >
          <Button
            sx={{ color: "inherit" }}
            disabled={controlPage}
            onClick={(e) => handleChangePage(e)}
            variant="outlined"
          >
            Load more
          </Button>
        </Stack>
        <ToastContainer />
      </Container>
    </>
  );
}

export default memo(HomePage);
