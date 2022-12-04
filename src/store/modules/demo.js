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
      
      state.workName = action.payload.workName;
    },
    clearWork:(state,action)=>{
      state.work = initialState.work
    },
    resetWorkInfo:(state)=>{
      let {work,workName,currentBrush} = initialState
      state.work = work
      state.workName = ''
      state.currentBrush = currentBrush
    }
  },
});
export const { setWork, setBrush, setWorkname ,clearWork,resetWorkInfo} = demolSlice.actions;
export default demolSlice.reducer;
