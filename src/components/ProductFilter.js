import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { FRadioGroup } from "./form";

const FILTER_BY_PRICE = [
  { value: "$lt: $500", label: "Below $500" },
  { value: "$gte: $500, $lte: $700", label: "Between $500 - $700" },
  { value: "$gte: $700", label: "Above $700" },
];

function ProductFilter() {
  return (
    <Stack m={1} spacing={2}>
      <Stack>
        <Typography>Price</Typography>
        <FRadioGroup
          name="priceRange"
          options={FILTER_BY_PRICE.map((option) => option.value)}
          label={FILTER_BY_PRICE.map((option) => option.label)}
        />
      </Stack>
      <Divider variant="middle" />
    </Stack>
  );
}

export default ProductFilter;
