import {
  Box,
  Container,
  Stack,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import { getPaymentDetail } from "../features/item/itemSlice";
import { useParams } from "react-router-dom";
import { DOMAIN_URL } from "../app/config";
import LoadingScreen from "../components/LoadingScreen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const styles = {
  styleBoxIcon: {
    backgroundColor: "success.light",
    borderRadius: 10,
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  styleBoxCover: {
    display: { xs: "", md: "flex" },
    width: { xs: 350, md: 1000 },
    justifyContent: "space-evenly",
    backgroundColor: "success.lighter",
    p: 2,
    height: { xs: 350, md: 180 },
    alignItems: "center",
    alignContent: "center",
    borderRadius: 3,
    m: 2,
  },
};

function HistoryPage() {
  const params = useParams();
  const paymentId = params.id;
  const dispatch = useDispatch();

  const { paymentDetail, isLoading } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getPaymentDetail({ paymentId }));
  }, [dispatch, paymentId]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Breadcrumbs m={1} separator="›" aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              SNEAKER STORE
            </Link>
            <Typography color="#212121">History</Typography>
          </Breadcrumbs>
          <Container
            sx={{
              maxWidth: { xs: 400, md: "200vh" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={styles.styleBoxCover} name="userInfo">
              <Stack direction="row" name="user">
                <Box sx={styles.styleBoxIcon}>
                  <PersonIcon color="success" sx={{ fontSize: 50 }} />
                </Box>
                <Box component="div" ml={2}>
                  <Typography variant="h6">Customer</Typography>
                  <Typography variant="subtitle1">
                    {paymentDetail.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    {paymentDetail.email}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" name="oderInfo">
                <Box sx={styles.styleBoxIcon}>
                  <LocalShippingRoundedIcon
                    color="success"
                    sx={{ fontSize: 50 }}
                  />
                </Box>
                <Box component="div" ml={2}>
                  <Typography variant="h6">Oder Info</Typography>
                  <Typography variant="subtitle1">
                    Shipping: {paymentDetail?.address?.country_code}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    {paymentDetail?.data?.status === "COMPLETED" ? (
                      <Typography variant="subtitle1">
                        Payment:
                        <CheckCircleIcon
                          sx={{ mb: -0.6, ml: 0.2, color: "#388e3c" }}
                        />{" "}
                        Completed
                      </Typography>
                    ) : (
                      <Typography variant="subtitle1">
                        Payment:
                        <ErrorIcon
                          sx={{ mb: -0.6, ml: 0.2, color: "#b71c1c" }}
                        />{" "}
                        Failed
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Stack>

              <Stack direction="row" name="address">
                <Box sx={styles.styleBoxIcon}>
                  <PinDropRoundedIcon color="success" sx={{ fontSize: 50 }} />
                </Box>
                <Box component="div" ml={2}>
                  <Typography variant="h6">Deliver to</Typography>
                  <Typography variant="subtitle1">
                    Address: {paymentDetail?.address?.address_line_1},{" "}
                    {paymentDetail?.address?.admin_area_1},{" "}
                    {paymentDetail?.address?.admin_area_2}
                  </Typography>
                  <Typography variant="subtitle1">
                    Postal code: {paymentDetail?.address?.postal_code}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell>Products</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentDetail?.product?.map((oder) => (
                    <TableRow
                      key={oder.product._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Box
                          component="img"
                          height="80px"
                          width="80px"
                          src={`${DOMAIN_URL}${oder.product.image}`}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {oder.product.brand}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {oder.quantity}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        $ {oder.product.price * oder.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </>
      )}
    </>
  );
}

export default HistoryPage;
