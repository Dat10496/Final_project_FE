import { React, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getItems } from "../features/item/itemSlice";
import { SORT_BY_ITEM } from "../app/config";

export default function ProductSort({ page }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortValue, setSortValue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sort } = useParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
    setSortValue(value);

    if (value) {
      navigate(`/sort/${value}`);
    }
  };

  useEffect(() => {
    const value = sortValue;

    if (!sort) {
      setSortValue();
    } else if (sortValue || (sortValue && page)) {
      dispatch(getItems({ value, page }));
    }
  }, [sortValue, page, dispatch, sort]);

  return (
    <>
      <Button
        sx={{ color: "#212121" }}
        p={0}
        onClick={handleClick}
        endIcon={anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        variant="outlined"
        size="small"
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
