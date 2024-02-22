import {
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Box,
  Typography,
  Checkbox,
  FormGroup,
} from "@mui/material";
import FormControl from "@material-ui/core/FormControl";
import { React, useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useNavigate, useParams } from "react-router-dom";

import { getItems } from "../features/item/itemSlice";
import {
  FILTER_BY_RATING,
  FILTER_BY_PRICE,
  FILTER_BY_BRAND,
} from "../app/config";

function ProductFilter({ page }) {
  const [sortByPrice, setSortByPrice] = useState({ price: "" });
  const [sortByRating, setSortByRating] = useState({ rating: "" });
  const [sortByBrand, setSortByBrand] = useState({});
  const [controlBtn, setControlBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search, value, sort } = useParams();

  // Sort product by price
  const handleSelectPrice = (option) => {
    navigate(`/filter/${option.label}`);
    if (sortByPrice.price === option.value) {
      setSortByPrice({ price: "" });
    } else {
      const price = option.value;
      setSortByPrice({ price });
    }
  };

  // Sort product by rating
  const handleSelectRating = (option) => {
    navigate(`/filter/${option.label}`);
    if (sortByRating.rating === option.value) {
      setSortByRating({ rating: "" });
    } else {
      const rating = option.value;
      setSortByRating({ rating });
    }
  };

  // Sort product by brand
  const handleSelectBrand = (option) => {
    navigate(`/filter/${option.label}`);
    if (sortByBrand.brand === option.value) {
      setSortByBrand({});
    } else {
      const brand = option.value;
      setSortByBrand({ brand });
    }
  };

  const resetFilter = () => {
    setSortByRating({ rating: "" });
    setSortByPrice({ price: "" });
    setSortByBrand({});

    dispatch(getItems({}));
    navigate("/");
  };

  useEffect(() => {
    const { price } = sortByPrice;
    const { rating } = sortByRating;
    const { brand } = sortByBrand;

    if (!brand && !price && !rating && !page && !value && !search && !sort) {
      navigate("/");
      dispatch(getItems({}));
    }

    const handleSortOption = () => {
      if ((price || rating || brand) && page) {
        dispatch(getItems({ price, rating, brand, page }));
      } else if (price || rating || brand) {
        dispatch(getItems({ price, rating, brand }));
      }
    };

    handleSortOption();

    // Control Btn FilterPage
    const handleControlFilter = () => {
      if (!brand && price === "" && rating === "") {
        setControlBtn(true);
      } else {
        setControlBtn(false);
      }
    };

    handleControlFilter();

    // eslint-disable-next-line
  }, [sortByBrand, sortByPrice, sortByRating, page]);

  return (
    <>
      <Box width={{ sm: 200, xs: "100%" }}>
        <Stack m={1} spacing={2}>
          <Stack>
            {/* Filter by brand */}
            <Typography variant="h6">Brand</Typography>
            {FILTER_BY_BRAND.map((option) => (
              <FormGroup key={option.value}>
                <FormControlLabel
                  value={option.value}
                  onClick={() => handleSelectBrand(option)}
                  control={
                    <Checkbox
                      checked={sortByBrand.brand === option.label}
                      name={option.label}
                    />
                  }
                  label={option.label}
                />
              </FormGroup>
            ))}
          </Stack>
          <Divider variant="middle" />
          {/*  */}

          {/* Filter by price */}
          <Stack>
            <Typography variant="h6">Price</Typography>

            <FormControl>
              <RadioGroup value={sortByPrice.price} name="PriceRange">
                {FILTER_BY_PRICE.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    onClick={() => handleSelectPrice(option)}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>
          <Divider variant="middle" />
          {/*  */}

          {/* Filter by rating */}
          <Stack>
            <Typography variant="h6">Rating</Typography>

            <FormControl>
              <RadioGroup value={sortByRating.rating} name="RatingRange">
                {FILTER_BY_RATING.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    onClick={() => handleSelectRating(option)}
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
            </FormControl>
          </Stack>
        </Stack>
        {/*  */}

        <Stack>
          <Button
            size="large"
            type="reset"
            color="inherit"
            variant="outlined"
            onClick={resetFilter}
            startIcon={<ClearAllIcon />}
            disabled={controlBtn}
          >
            Clear All
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default memo(ProductFilter);
