import {
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { React, useState } from "react";
import { getItems } from "../features/item/itemSlice";
import { useDispatch } from "react-redux";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const FILTER_BY_RATING = [
  { value: "$lte 3", label: "Below 3" },
  { value: "$gt 3, $lt 4", label: "From 3 - 4" },
  { value: "$gte 4", label: "Above 4" },
];

const FILTER_BY_PRICE = [
  { value: "$lte 500", label: "Below $500" },
  { value: "$gte 500, $lte 1500", label: "Between $500 - $1500" },
  { value: "$gte 1500", label: "Above $1500" },
];

function ProductFilter({ page }) {
  const [sortByPrice, setSortByPrice] = useState();
  const [sortByRating, setSortByRating] = useState();
  const dispatch = useDispatch();

  const handleSelectPrice = (option) => {
    const price = option.value;
    setSortByPrice({ price });
  };

  const handleSelectRating = (option) => {
    const rating = option.value;
    setSortByRating({ rating });
  };

  const handleSortOption = () => {
    const { price } = sortByPrice;
    const { rating } = sortByRating;
    dispatch(getItems({ price, rating }));
  };

  const resetFilter = () => {
    setSortByPrice();
    setSortByRating();
    dispatch(getItems({ page }));
  };

  return (
    <>
      <Stack m={1} spacing={2}>
        <Stack>
          <Typography>Price</Typography>
          <RadioGroup name="PriceRange">
            {FILTER_BY_PRICE.map((option) => (
              <FormControlLabel
                onClick={() => handleSelectPrice(option)}
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </Stack>
        <Divider variant="middle" />
        <Stack>
          <Typography>Rating</Typography>
          <RadioGroup name="RatingRange">
            {FILTER_BY_RATING.map((option) => (
              <FormControlLabel
                onClick={() => handleSelectRating(option)}
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={
                  <Stack flexDirection="row" alignContent="center">
                    {option.label}
                    <StarOutlineIcon />
                  </Stack>
                }
              />
            ))}
          </RadioGroup>
        </Stack>
      </Stack>
      <Stack>
        <Button onClick={handleSortOption}>Supply</Button>
      </Stack>
      <Button
        size="large"
        type="submit"
        color="inherit"
        variant="outlined"
        onClick={resetFilter}
        startIcon={<ClearAllIcon />}
      >
        Clear All
      </Button>
    </>
  );
}

export default ProductFilter;
