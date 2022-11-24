import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./modules/global";
const store = configureStore({
  reducer: {
    globalSlice,
  },
});

export default store;
