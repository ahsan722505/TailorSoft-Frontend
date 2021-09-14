import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showDash: false,
    showPendingOrders: true,
    showNewOrder: false,
    showSearchClients: false,
    showSettings: false,
    showPendDetails: false,
    showPendUpdate : false
  },
  reducers: {
    toggleDashHandler(state) {
      state.showDash = !state.showDash;
    },
    showPendingOrdersHandler(state) {
      state.showPendingOrders = true;
      state.showNewOrder = false;
      state.showSearchClients = false;
      state.showSettings = false;
    },
    showNewOrderHandler(state) {
      state.showPendingOrders = false;
      state.showNewOrder = true;
      state.showSearchClients = false;
      state.showSettings = false;
    },
    showSearchClientsHandler(state) {
      state.showPendingOrders = false;
      state.showNewOrder = false;
      state.showSearchClients = true;
      state.showSettings = false;
    },
    showSettingsHandler(state) {
      state.showPendingOrders = false;
      state.showNewOrder = false;
      state.showSearchClients = false;
      state.showSettings = true;
    },
    togglePendDetailsHandler(state){
      state.showPendDetails=!state.showPendDetails
    },
    togglePendUpdateHandler(state){
      state.showPendUpdate=!state.showPendUpdate
    }
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
