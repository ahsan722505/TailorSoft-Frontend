import styles from "./PendDetail.module.css"
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const PendDetail=(props)=>{
    
    
return(
    
        
            <div>        
                <p>name : {props.order.clientId.name}</p>
                <p>email : {props.order.clientId.email}</p>
                <p>measurements:</p>
                <div>
                    {props.order.clientId.measurements}
                </div>
                <p>created At: {props.order.createdAt}</p>
                <p>return Date: {props.order.returnDate}</p>
                <p>price : {props.order.price}</p>
                <p>Stitch Details:</p>
                <div>
                    {props.order.cloth}
                </div>
                </div>
        
)
}
export default PendDetail;