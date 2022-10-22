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

function PaymentHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  return (
    <Container sx={{ maxWidth: { xs: 400, sm: "100vh" } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "success.lighter",
          borderRadius: 1,
          mb: 2,
          p: 1,
          width: { xs: 350, md: 700 },
        }}
      >
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
            {history.map((oder) => (
              <TableRow
                key={oder._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  PAID-{oder.data[0].id}
                </TableCell>
                <TableCell align="right">
                  {oder.data[0].create_time.slice(0, 10)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(`/history/${oder._id}`)}
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
