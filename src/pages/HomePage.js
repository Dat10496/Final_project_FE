import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import { React, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import {
  useSearchParams,
  Link as RouterLink,
  useParams,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import useAuth from "../hooks/useAuth";
import ItemCard from "../features/item/ItemCard";
import LoadingScreen from "../components/LoadingScreen";
import ProductFilter from "../components/ProductFilter";
import ProductSort from "../components/ProductSort";
import ProductSearch from "../components/ProductSearch";
import { getItems } from "../features/item/itemSlice";
import SearchingInfo from "../components/SearchingInfo";

function HomePage() {
  const [searchParams] = useSearchParams();
  const { page, value, search, sort } = useParams();

  const auth = useAuth();
  const dispatch = useDispatch();
  const { isLoading, items, totalPages } = useSelector((state) => state.item);

  const googleId = searchParams.get("googleId");
  const { loginWithGoogle } = auth;

  const handleChangePage = (item) => {
    window.scrollTo(0, 0);
    if (value) {
      return `/filter/${value}/page/${item.page}`;
    } else if (search) {
      return `/search=${search}/page/${item.page}`;
    } else if (sort) {
      return `/sort=${sort}/page/${item.page}`;
    } else {
      return `/page/${item.page}`;
    }
  };

  useEffect(() => {
    if (googleId) {
      loginWithGoogle({ googleId });
    }

    if (!value && !search && !sort && page) {
      dispatch(getItems({ page }));
    }

    // eslint-disable-next-line
  }, [page, dispatch]);

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
            <ProductSearch page={page} />
            <ProductSort page={page} />
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
                  <Box
                    sx={{
                      flexGrow: 1,
                      ml: 4,
                      width: { xs: 350, md: 900 },
                    }}
                  >
                    {(search || sort) && <SearchingInfo />}
                    <Grid container spacing={1.5} mt={1}>
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
          {(totalPages !== 0 || totalPages !== 1) && (
            <Pagination
              page={Number(page) || 1}
              count={totalPages}
              defaultPage={1}
              variant="outlined"
              color="secondary"
              renderItem={(item) => (
                <PaginationItem
                  component={RouterLink}
                  to={handleChangePage(item)}
                  {...item}
                />
              )}
            />
          )}
        </Stack>
        <ToastContainer />
      </Container>
    </>
  );
}

export default memo(HomePage);
