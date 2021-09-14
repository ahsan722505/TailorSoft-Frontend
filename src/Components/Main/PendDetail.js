import styles from "./PendDetail.module.css"
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const PendDetail=(props)=>{
    
    
return(
    
        
            <div>        
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
        
)
}
export default PendDetail;