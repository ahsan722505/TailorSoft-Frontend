import styles from "./PendingOrder.module.css"
const PendingOrder=(props)=>{
    return(
        <div className={styles.orderCont}>
                <p>Name : {props.order.client.name}</p>
                <p>createdAt : {props.order.createdAt}</p>
                <p>returnDate : {props.order.returnDate}</p>
                <button>Details</button>
        </div>
    )
}
export default PendingOrder;