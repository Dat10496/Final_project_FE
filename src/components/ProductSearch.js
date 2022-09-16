import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { getItems } from "../features/item/itemSlice";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const brand = query;
    dispatch(getItems({ brand }));
  }, [dispatch, query]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ borderRadius: 20 }}
      mt={2}
    >
      <TextField
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        size="small"
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
    </Box>
  );
}
