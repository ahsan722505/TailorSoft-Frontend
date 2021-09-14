import styles from "./PendingOrder.module.css"
import PendModal from "./PendModal";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import AhsanModal from "../Helpers/AhsanModal";
import NewOrder from "./NewOrder";

const PendingOrder=(props)=>{
    const dispatch=useDispatch();
    const showDetailHandler=()=>{
        dispatch(uiActions.togglePendDetailsHandler())
    }
    const showUpdateHandler=()=>{
        dispatch(uiActions.togglePendUpdateHandler())
    }
    const closeUpdateHandler=()=>{
        dispatch(uiActions.togglePendUpdateHandler())
    }
    const showDetails=useSelector((state)=>state.ui.showPendDetails)
    const showUpdate=useSelector(state=> state.ui.showPendUpdate)
    return(
        <Fragment>
        <div className={styles.orderCont}>
                <p>Name : {props.order.client.name}</p>
                <p>createdAt : {props.order.createdAt}</p>
                <p>returnDate : {props.order.returnDate}</p>
                <button onClick={showDetailHandler}>Details</button>
                <button>Delete</button>
                <button onClick={showUpdateHandler}>Update</button>
        </div>
        {showDetails && <PendModal order={props.order}/>}
        {showUpdate && <AhsanModal closeHandler={closeUpdateHandler}>
            <NewOrder/>
            </AhsanModal>}
        

        </Fragment>
    )
}
export default PendingOrder;