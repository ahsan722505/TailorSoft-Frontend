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
        },replaceOrder(state,action){
            const index=state.orders.findIndex(order=>order._id === action.payload._id);
            state.orders[index]=action.payload;
        },
        deleteOrder(state,action){
            console.log(action.payload);
            state.orders=state.orders.filter(order=> order._id !== action.payload)
        },
        resetState(state){
            state.orders=[];
        }
    }
})
export const ordersActions = ordersSlice.actions;
export default ordersSlice;