import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  items: [],
  totalPages: {},
  itemDetail: {},
  cart: [],
  totalPrice: 0,
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
    getItemToCartSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.cart.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removeItemFromCartSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      const { index, item } = action.payload;
      state.cart.splice(index, 1);
      state.totalPrice -= item.price;
    },
    paymentSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.totalPrice = 0;
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

export const addItemToCart =
  ({ item }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.getItemToCartSuccess(item));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const removeItemFromCart =
  ({ item, index }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      dispatch(slice.actions.removeItemFromCartSuccess({ index, item }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const payment =
  ({ details }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log(details);
    try {
      dispatch(slice.actions.paymentSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
