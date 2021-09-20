import styles from "./Confirmation.module.css"
import AhsanModal from "./AhsanModal";
import { Fragment } from "react";
const Confirmation=(props)=>{
    return(
        <AhsanModal closeHandler={props.closeHandler} >
                <div className={styles.message}>{props.message}</div>
                <div className={styles.btnCont}>
                    { !props.warning &&  <button onClick={props.closeHandler} className={styles.btn}>ok</button>}
                    {props.warning && <Fragment>
                                <button className={styles.btn} onClick={props.closeHandler}>No</button>
                                <button className={styles.btn} onClick={props.proceedHandler} >Yes</button>                       
                        </Fragment>}
                    </div>
                
        </AhsanModal>
    )
}
export default Confirmation;