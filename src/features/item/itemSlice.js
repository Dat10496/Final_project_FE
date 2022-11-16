import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  items: [],
  itemDetail: {},
  totalPages: {},
  history: [],
  paymentDetail: {},
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

    getHistorySuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.history = action.payload;
    },

    getPaymentDetailSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.paymentDetail = action.payload;
    },
  },
});

export const getItems =
  ({ brand, price, rating, page, value, limit = ITEM_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let params = { page, limit, brand, rating, price, value };
      console.log(brand);
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

export const getHistory = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("users/history");
    dispatch(slice.actions.getHistorySuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getPaymentDetail =
  ({ paymentId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`payment/${paymentId}`);
      dispatch(slice.actions.getPaymentDetailSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
