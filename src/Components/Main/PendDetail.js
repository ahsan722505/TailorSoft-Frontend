import styles from "./PendDetail.module.css"
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const PendDetail=(props)=>{
    
    
return(
    
        
            <div className={styles.detailCont}>        
                <p className={styles.name}><span>name : </span>{props.order.clientId.name}</p>
                <p className={styles.email} ><span>email : </span>{props.order.clientId.email}</p>
                <div className={styles.measurements}>
                <p><span>measurements:</span></p>
                <div>
                    {props.order.clientId.measurements}
                </div>

                </div>
                <p className={styles.createdAt}><span>created At: </span>{props.order.createdAt}</p>
                <p className={styles.returnDate}><span>return Date: </span>{props.order.returnDate}</p>
                <p className={styles.price}><span>price : </span>{props.order.price}</p>
                <div className={styles.cloth}>
                <p><span>Stitch Details:</span></p>
                <div>
                    {props.order.cloth}
                </div>

                </div>
                </div>
        
)
}
export default PendDetail;