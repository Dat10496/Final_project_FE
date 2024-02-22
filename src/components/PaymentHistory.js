import {
  Container,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getHistory } from "../features/item/itemSlice";

const styles = {
  boxCover: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "success.lighter",
    borderRadius: 1,
    mb: 2,
    p: 1,
    width: { xs: 350, md: 700 },
  },
};

function PaymentHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  return (
    <Container sx={{ maxWidth: { xs: 400, sm: "100vh" }, mt: 1 }}>
      <Box sx={styles.boxCover}>
        <Typography variant="h4">HISTORY</Typography>
        <Typography variant="h6">You have {history.length} order</Typography>
      </Box>

      <TableContainer sx={{ width: { xs: 350, md: 700 } }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell align="right">Date of Purchase</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {history.map((order) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  PAID-{order.paymentId}
                </TableCell>
                <TableCell align="right">
                  {order.data.create_time.slice(0, 10)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(`/history/${order._id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PaymentHistory;
