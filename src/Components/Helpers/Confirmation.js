import styles from "./Confirmation.module.css"
import AhsanModal from "./AhsanModal";
const Confirmation=(props)=>{
    return(
        <AhsanModal closeHandler={props.closeHandler} >
                <div className={styles.message}>{props.message}</div>
                <div className={styles.btnCont}><button onClick={props.closeHandler} className={styles.btn}>ok</button></div>
                
        </AhsanModal>
    )
}
export default Confirmation;