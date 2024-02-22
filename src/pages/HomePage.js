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

const styles = {
  boxCover: {
    display: { sm: "flex", xs: "block" },
    justifyContent: "space-between",
    alignItems: "center",
    m: 1,
    maxWidth: "200vh",
  },
  link: { display: "flex", alignItems: "center" },
  boxWrapSearchSort: {
    display: { xs: "", sm: "flex" },
    width: { xs: "80%" },
    justifyContent: "flex-end",
    alignItems: "center",
    mr: 3,
  },
  stackCoverFilter: {
    mr: 2,
    mt: 2,
    alignItems: { xs: "center", sm: "" },
  },
  boxCoverGrid: {
    mt: { xs: 2 },
    width: { xs: "100%", md: 940 },
  },
  stackCoverPag: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    m: 1,
  },
};

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
      return `/search/${search}/page/${item.page}`;
    } else if (sort) {
      return `/sort/${sort}/page/${item.page}`;
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
        <Box sx={styles.boxCover}>
          <Breadcrumbs
            m={1}
            separator="›"
            aria-label="breadcrumb"
            sx={{ width: { xs: "90%" } }}
          >
            <Link underline="hover" sx={styles.link} color="inherit" href="/">
              <HomeIcon fontSize="medium" />
              SNEAKER STORE
            </Link>
            <Typography color="#212121">Home</Typography>
          </Breadcrumbs>

          <Box sx={styles.boxWrapSearchSort}>
            <ProductSearch page={page} />
            <ProductSort page={page} />
          </Box>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }}>
          <Stack sx={styles.stackCoverFilter}>
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
                  <Box sx={styles.boxCoverGrid}>
                    {(search || sort) && <SearchingInfo />}
                    <Grid container spacing={1.5} mt={1}>
                      {items.map((item) => (
                        <Grid
                          key={item._id}
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          sx={{
                            display: { xs: "flex", sm: "" },
                            flexDirection: "column",
                            alignItems: "center",
                            height: 420,
                          }}
                        >
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

        <Stack sx={styles.stackCoverPag} spacing={1}>
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
