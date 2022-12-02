import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./modules/global";
import demolSlice from "./modules/demo";
const store = configureStore({
  reducer: {
    globalSlice,
    demolSlice,
  },
});

export default store;
