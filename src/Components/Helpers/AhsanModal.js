import styles from "./AhsanModal.module.css";
import { Fragment } from "react";
// import { Scrollbars } from 'react-custom-scrollbars';
const AhsanModal=(props)=>{
    return(
        <Fragment>
            
            <div className={styles.modal}>

                    <div className={styles.closeCont}>

                        <i class="fas fa-times-circle" onClick={props.closeHandler}></i>
                    </div>
                <div className={styles.wrap}>
                    {props.children}
        
                </div>
            </div>
            
            <div className={styles.backdrop} onClick={props.closeHandler}>

            </div>
        </Fragment>
    )
}
export default AhsanModal;