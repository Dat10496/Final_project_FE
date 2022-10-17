import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getItems } from "../features/item/itemSlice";

const SORT_BY_ITEM = [
  { value: "createdAt -1", label: "Newest" },
  { value: "price: -1", label: "Price: High-Low" },
  { value: "price: 1", label: "Price: Low-High" },
];

export default function SortBy() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
    dispatch(getItems({ value }));
  };

  return (
    <>
      <Button
        sx={{ color: "#212121" }}
        p={0}
        onClick={handleClick}
        endIcon={anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        Sort By
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box>
          {SORT_BY_ITEM.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleClose(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
}
