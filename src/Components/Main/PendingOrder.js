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

const PendingOrder=(props)=>{
    const [showDetails,setDetails]=useState(false);
    const [showUpdate,setUpdate]=useState(false);
    const [showWarning,setWarning]=useState(false);
    
    const dispatch=useDispatch();
    
    const toggleDetailHandler=()=>{
        
        setDetails((state)=>!state)
    }
    const toggleUpdateHandler=()=>{
        setUpdate(state=>!state)
        
    }
    const toggleWarning=()=>{
        setWarning(state=>!state)
    }
    
    const deleteHandler=()=>{
        
        
        
        setWarning(false);
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
            
            
            props.toggleSuccess()
            dispatch(ordersActions.deleteOrder(props.order._id))
            
        }).catch(err=>{
            if(clientError) props.toggleLoader()
            

            
            props.toggleFailure();
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
                <button onClick={toggleDetailHandler}>Details</button>
                <button onClick={toggleWarning}>Delete</button>
                <button onClick={toggleUpdateHandler}>Update</button>
        </div>
        {showDetails && <AhsanModal closeHandler={toggleDetailHandler}>{details}</AhsanModal>}
        {showUpdate && <AhsanModal closeHandler={toggleUpdateHandler}>
            {update}
            </AhsanModal>}
            {showWarning && <Confirmation warning={true} closeHandler={toggleWarning} proceedHandler={deleteHandler} message="Are You sure you want to delete this order?"/>}
            
        

        </Fragment>
    )
}
export default PendingOrder;