import { createSlice } from "@reduxjs/toolkit";
const ordersSlice=createSlice({
    name : "ordersSlice",
    initialState : {
        orders : []

    },
    reducers : {
        addOrders(state,action){
            state.orders=action.payload
        },
        addOrder(state,action){
            state.orders.push(action.payload)
        }
    }
})
export const ordersActions = ordersSlice.actions;
export default ordersSlice;