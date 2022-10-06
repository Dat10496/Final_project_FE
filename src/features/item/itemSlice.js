import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  items: [],
  itemDetail: {},
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

    getItemDetailSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.itemDetail = action.payload;
    },

    paymentSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.cart = [];
    },
  },
});

export const getItems =
  ({ brand, price, rating, page, value, limit = ITEM_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let params = { page, limit, brand, rating, price, value };

      if (brand) params.brand = brand;
      if (price) params.price = price;
      if (rating) params.rating = rating;

      const response = await apiService.get("/items", { params });
      dispatch(slice.actions.getItemSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getItemDetail =
  ({ itemId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/items/${itemId}`);
      dispatch(slice.actions.getItemDetailSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const payment =
  ({ details, user, cart }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log(details, user);
    try {
      let body = { details, user, cart };
      const response = await apiService.post("/payment", body);
      console.log(response);
      dispatch(slice.actions.paymentSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
