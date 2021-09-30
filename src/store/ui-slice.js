import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showDash: false,
    showPendingOrders: true,
    showNewOrder: false,
    showSearchClients: false,
    showMails : false,
    showSettings: false,
    firstRender : true,
    meta : {
      show : false,
      message : "",
    }
    
    
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
      state.showMails = false;
    },
    showNewOrderHandler(state) {
      state.showPendingOrders = false;
      state.showNewOrder = true;
      state.showSearchClients = false;
      state.showSettings = false;
      state.showMails = false;
    },
    showSearchClientsHandler(state) {
      state.showPendingOrders = false;
      state.showNewOrder = false;
      state.showSearchClients = true;
      state.showSettings = false;
      state.showMails = false;
    },
    showSettingsHandler(state) {
      state.showPendingOrders = false;
      state.showNewOrder = false;
      state.showSearchClients = false;
      state.showSettings = true;
      state.showMails = false;
    },
    showMailsHandler(state) {
      state.showPendingOrders = false;
      state.showNewOrder = false;
      state.showSearchClients = false;
      state.showSettings = false;
      state.showMails = true;
    },
    toggleFirstRender(state){
      state.firstRender=!state.firstRender
    },
    toggleMeta(state,action){
      state.meta.show=!state.meta.show;
      state.meta.message=action.payload;
    }
    
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
