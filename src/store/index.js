import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import ordersSlice from "./orders-slice";
import authSlice from "./auth-slice";
const store = configureStore({
  reducer: { ui: uiSlice.reducer ,porders : ordersSlice.reducer , auth : authSlice.reducer },
});
export default store;
