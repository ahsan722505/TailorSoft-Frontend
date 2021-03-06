import styles from "./PendingOrder.module.css"
import PendDetail from "./PendDetail";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import AhsanModal from "../Helpers/AhsanModal";
import NewOrder from "./NewOrder";
import Confirmation from "../Helpers/Confirmation";
import { ordersActions } from "../../store/orders-slice";
// import { set } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

const PendingOrder=(props)=>{
    const [showDetails,setDetails]=useState(false);
    const [showUpdate,setUpdate]=useState(false);
    const [warning,setWarning]=useState({showWarning : false, message : null , proceedHandler : null});
    
    const dispatch=useDispatch();
    
    const toggleDetailHandler=()=>{
        
        setDetails((state)=>!state)
    }
    const toggleUpdateHandler=()=>{
        setUpdate(state=>!state)
        
    }
    const toggleWarning=(e)=>{
        // console.log(e.target.value)
        if(e.target.value === "delete"){
            setWarning(state=> { return {showWarning : !state.showWarning , message : "Are You sure you want to delete this order?", proceedHandler : deleteHandler}} )
            
        }else if(e.target.value === "complete"){
            setWarning(state=>{return {showWarning : !state.showWarning , message : "Are You sure you want to complete this order?", proceedHandler : completeHandler}})
        }else{
            setWarning(state=>{ return {showWarning : !state.showWarning , message : null, proceedHandler : null}})
        }
    }
    const  completeHandler=()=>{
        setWarning(state=>{ return {showWarning : !state.showWarning , message : null, proceedHandler : null}})
        props.toggleLoader();
        let clientError=true;
        fetch(`${process.env.REACT_APP_HOST}/api/completeOrder`,{
            method : "PATCH",
            headers: { "Content-type": "application/json" },
            body : JSON.stringify({orderId : props.order._id})
        }).then(res=>{
            clientError=false;
            props.toggleLoader();
            if(res.status === 500 || !res.ok) throw new Error("There was an error");
            
            
            
            dispatch(uiActions.toggleMeta("The order is completed."));
            dispatch(ordersActions.deleteOrder(props.order._id))
            
        }).catch(err=>{
            if(clientError) props.toggleLoader()
            

            
            
            dispatch(uiActions.toggleMeta("There was an error please try  again."));
        })

    }
    
    const deleteHandler=()=>{
        
        
        
        
        setWarning(state=>{ return {showWarning : !state.showWarning , message : null, proceedHandler : null}})
        props.toggleLoader();
        let clientError=true;
        fetch(`${process.env.REACT_APP_HOST}/api/deleteOrder`,{
            method : "DELETE",
            headers: { "Content-type": "application/json" },
            body : JSON.stringify({orderId : props.order._id})
        }).then(res=>{
            clientError=false;
            props.toggleLoader();
            if(res.status === 500 || !res.ok) throw new Error("There was an error");
            
            
            // props.toggleSuccess()
            dispatch(uiActions.toggleMeta("The order was deleted."));
            dispatch(ordersActions.deleteOrder(props.order._id))
            
        }).catch(err=>{
            if(clientError) props.toggleLoader()
            

            
            // props.toggleFailure();
            dispatch(uiActions.toggleMeta("There was an error please try  again."));
        })
    }
    
    const details=<PendDetail order={props.order}/>
    const update=<NewOrder order={props.order}/>
    return(
        <Fragment>
        <div className={styles.orderCont}>
                <p>Name : {props.order.clientId.name}</p>
                <p>createdAt : {props.order.createdAt}</p>
                <p>returnDate : {props.order.returnDate}</p>
                <hr/>
                <div className={styles.btnCont}>
                    <div>
                        <button onClick={toggleDetailHandler}>Details</button>
                        <button value="delete" onClick={toggleWarning}>Delete</button>

                    </div>
                    <div>

                        <button  onClick={toggleUpdateHandler}>Update</button>
                        <button value="complete" onClick={toggleWarning}>Complete</button>
                    </div>
                </div>
        </div>
        {showDetails && <AhsanModal closeHandler={toggleDetailHandler}>{details}</AhsanModal>}
        {showUpdate && <AhsanModal closeHandler={toggleUpdateHandler}>
            {update}
            </AhsanModal>}
            {warning.showWarning && <Confirmation warning={true} closeHandler={toggleWarning} proceedHandler={warning.proceedHandler} message={warning.message}/>}
            
        

        </Fragment>
    )
}
export default PendingOrder;