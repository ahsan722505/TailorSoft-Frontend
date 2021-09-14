import styles from "./PendingOrder.module.css"
import PendDetail from "./PendDetail";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import AhsanModal from "../Helpers/AhsanModal";
import NewOrder from "./NewOrder";

const PendingOrder=(props)=>{
    console.log("rendering")
    const [showDetails,setDetails]=useState(false);
    const [showUpdate,setUpdate]=useState(false);
    const dispatch=useDispatch();
    const toggleDetailHandler=()=>{
        // dispatch(uiActions.togglePendDetailsHandler())
        setDetails((state)=>!state)
    }
    const toggleUpdateHandler=()=>{
        setUpdate(state=>!state)
        // dispatch(uiActions.togglePendUpdateHandler())
    }
    // const closeUpdateHandler=()=>{
    //     // dispatch(uiActions.togglePendUpdateHandler())
    // }
    // const showDetails=useSelector((state)=>state.ui.showPendDetails)
    // const showUpdate=useSelector(state=> state.ui.showPendUpdate)
    const details=<PendDetail order={props.order}/>
    const update=<NewOrder order={props.order}/>
    return(
        <Fragment>
        <div className={styles.orderCont}>
                <p>Name : {props.order.client.name}</p>
                <p>createdAt : {props.order.createdAt}</p>
                <p>returnDate : {props.order.returnDate}</p>
                <button onClick={toggleDetailHandler}>Details</button>
                <button>Delete</button>
                <button onClick={toggleUpdateHandler}>Update</button>
        </div>
        {showDetails && <AhsanModal closeHandler={toggleDetailHandler}>{details}</AhsanModal>}
        {showUpdate && <AhsanModal closeHandler={toggleUpdateHandler}>
            {update}
            </AhsanModal>}
        

        </Fragment>
    )
}
export default PendingOrder;