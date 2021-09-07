import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: { showDash: false },
  reducers: {
    toggleDashHandler(state) {
      state.showDash = !state.showDash;
    },
    
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
