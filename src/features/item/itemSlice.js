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
    getItemByBrandSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.items = action.payload.items;
      state.totalPages = parseInt(action.payload.totalPages);
    },
    getItemByPriceSuccess(state, action) {
      state.isLoading = false;
      state.hasError = null;
      state.items = action.payload.items;
      console.log(action.payload);
      state.totalPages = parseInt(action.payload.totalPages);
    },
  },
});

export const getItems =
  ({ page, limit = ITEM_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(
        `/items?page=${page}&limit=${limit}`
      );

      dispatch(slice.actions.getItemSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sortItemsByBrand =
  ({ page, brand, limit = ITEM_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(
        `/items?page=${page}&limit=${limit}&brand=${brand}`
      );

      dispatch(slice.actions.getItemByBrandSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sortItemsByPrice =
  ({ option, limit = ITEM_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log(option);
      const response = await apiService.get(
        `/items?limit=${limit}&option=${option}`
      );

      dispatch(slice.actions.getItemByPriceSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
