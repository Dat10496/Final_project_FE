import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  items: [],
  totalPages: {},
};

const ITEM_PER_PAGE = 12;

const slice = createSlice({
  name: "item",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getItemSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.items = action.payload.items;
      state.totalPages = parseInt(action.payload.totalPages);
    },
  },
});

export const getItems =
  ({ brand, price, rating, page, limit = ITEM_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let params = { page, limit, brand, rating, price };

      if (brand) params.brand = brand;
      if (price) params.price = price;
      if (rating) params.rating = rating;

      const response = await apiService.get("/items", { params });
      dispatch(slice.actions.getItemSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
