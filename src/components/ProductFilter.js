import {
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { React, useState } from "react";
import { getItems } from "../features/item/itemSlice";
import { useDispatch } from "react-redux";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SortIcon from "@mui/icons-material/Sort";

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

const FILTER_BY_BRAND = [
  { value: "Asian", label: "Asian" },
  { value: "Campus", label: "Campus" },
  { value: "Reebok", label: "Reebok" },
  { value: "Sparx", label: "Sparx" },
  { value: "Adidas", label: "Adidas" },
];

function ProductFilter({ page }) {
  const [sortByPrice, setSortByPrice] = useState({});
  const [sortByRating, setSortByRating] = useState({});
  const [sortByBrand, setSortByBrand] = useState({});
  const dispatch = useDispatch();

  const handleSelectPrice = (option) => {
    const price = option.value;
    setSortByPrice({ price });
  };

  const handleSelectRating = (option) => {
    const rating = option.value;
    setSortByRating({ rating });
  };

  const handleSelectBrand = (option) => {
    const brand = option.value;
    setSortByBrand({ brand });
  };

  const handleSortOption = () => {
    const { price } = sortByPrice;
    const { rating } = sortByRating;
    const { brand } = sortByBrand;

    dispatch(getItems({ price, rating, brand }));
  };

  const resetFilter = () => {
    setSortByRating();
    setSortByPrice();
    setSortByBrand();
    window.location.reload();
  };

  return (
    <>
      <Box width={200}>
        <Stack m={1} spacing={2}>
          <Stack>
            <Typography variant="h6">Brand ({sortByBrand.brand})</Typography>
            {FILTER_BY_BRAND.map((option) => (
              <Typography
                onClick={() => handleSelectBrand(option)}
                key={option.value}
                component={Button}
                variant="BUTTON"
                color="black"
                size="small"
              >
                {option.label}
              </Typography>
            ))}
          </Stack>
          <Divider variant="middle" />

          <Stack>
            <Typography variant="h6">Price</Typography>
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
            <Typography variant="h6">Rating</Typography>
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

        <Stack mb={2}>
          <Button
            sx={{ color: "#607d8b" }}
            startIcon={<SortIcon />}
            onClick={handleSortOption}
          >
            Filter
          </Button>
        </Stack>

        <Stack>
          <Button
            size="large"
            type="reset"
            color="inherit"
            variant="outlined"
            onClick={resetFilter}
            startIcon={<ClearAllIcon />}
          >
            Clear All
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default ProductFilter;
