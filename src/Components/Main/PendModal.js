import styles from "./PendModal.module.css"
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const PendModal=(props)=>{
    const dispatch=useDispatch();
    const togglePendHandler=()=>{
        dispatch(uiActions.togglePendDetailsHandler());
    }
return(
    <Fragment>
        
        <div className={styles.modal}>

                    <div className={styles.closeCont}>

                <i class="fas fa-times-circle" onClick={togglePendHandler}></i>
                    </div>
                <p>name : {props.order.client.name}</p>
                <p>email : {props.order.client.email}</p>
                <p>measurements:</p>
                <div>
                    {props.order.client.measurements}
                </div>
                <p>created At: {props.order.createdAt}</p>
                <p>return Date: {props.order.returnDate}</p>
                <p>price : {props.order.price}</p>
                <p>Stitch Details:</p>
                <div>
                    {props.order.cloth}
                </div>
        </div>
                
    
        <div className={styles.backdrop} onClick={togglePendHandler}>

        </div>
    </Fragment>
)
}
export default PendModal;