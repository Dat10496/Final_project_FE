import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { getItems } from "../features/item/itemSlice";
import { FormProvider, FTextField } from "../components/form/index";

const defaultValues = {
  query: "",
};

export default function ProductSearch({ page }) {
  const [queryValue, setQueryValue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useParams();

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    let { query } = data;
    const brand = query;

    try {
      if (!query) {
        navigate("/");
      } else {
        setQueryValue(brand);
        navigate(`/search=${brand}`);
      }
    } catch (error) {
      reset();
      console.log(error, "queryError");
    }
  };

  useEffect(() => {
    const brand = queryValue;
    if (!search) {
      setQueryValue();
    } else if ((queryValue && page) || queryValue) {
      dispatch(getItems({ brand, page }));
    }
  }, [page, queryValue, dispatch, search]);

  return (
    <Box color="#212121" sx={{ borderRadius: 20 }} mt={2} mr={3}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon type="submit" />
              </InputAdornment>
            ),
          }}
          placeholder="Enter your searching..."
          size="small"
          variant="outlined"
          name="query"
          label="Search"
          color="primary"
        />
      </FormProvider>
    </Box>
  );
}
