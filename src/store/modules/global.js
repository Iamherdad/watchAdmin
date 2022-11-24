import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingIsshow: false,
  token: "",
};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loadingIsshow = action.payload.state;
    },
  },
});
export const { setLoading } = globalSlice.actions;
export default globalSlice.reducer;
