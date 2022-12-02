import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  work: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  workName: "",
  currentBrush: 0,
};

export const demolSlice = createSlice({
  name: "demolSlice",
  initialState,
  reducers: {
    setWork: (state, action) => {
      let tempArr = [...state.work];
      tempArr[action.payload.ind] = state.currentBrush;
      state.work = tempArr;
    },
    setBrush: (state, action) => {
      state.currentBrush = action.payload.currentBrush;
    },
    setWorkname: (state, action) => {
      console.log(action, "action");
      state.workName = action.payload.workName;
    },
  },
});
export const { setWork, setBrush, setWorkname } = demolSlice.actions;
export default demolSlice.reducer;
