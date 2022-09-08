import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../features/item/itemSlice";

const rootReducer = {
  item: itemReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
