import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  items: [],
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
    },
  },
});

export const getItems =
  (page, limit = ITEM_PER_PAGE) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const params = { page, limit };
    const response = await apiService.get(`/items?${page}&${limit}`);
    dispatch(slice.actions.getItemSuccess(response.data.data));
    try {
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
