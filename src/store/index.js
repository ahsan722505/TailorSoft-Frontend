import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import ordersSlice from "./orders-slice";
const store = configureStore({
  reducer: { ui: uiSlice.reducer ,porders : ordersSlice.reducer },
});
export default store;
