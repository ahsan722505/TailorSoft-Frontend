import styles from "./PendingOrders.module.css";
import PendingOrder from "./PendingOrder";
const orders=[{createdAt : new Date().toDateString(), returnDate :new Date().toDateString(),price : 89, cloth : "This is pent shirt",client :{ name : "ahsan", email : "ahsan222@gmail.com",measurements : "jdhuwdiuwbuiw"}},{createdAt : new Date().toDateString(), returnDate :new Date().toDateString(),price : 89, cloth : "This is pent shirt",client :{ name : "ahsan", email : "ahsan222@gmail.com",measurements : "jdhuwdiuwbuiw"}},{createdAt : new Date().toDateString(), returnDate :new Date().toDateString(),price : 89, cloth : "This is pent shirt",client :{ name : "ahsan", email : "ahsan222@gmail.com",measurements : "jdhuwdiuwbuiw"}},{createdAt : new Date().toDateString(), returnDate :new Date().toDateString(),price : 89, cloth : "This is pent shirt",client :{ name : "ahsan", email : "ahsan222@gmail.com",measurements : "jdhuwdiuwbuiw"}},{createdAt : new Date().toDateString(), returnDate :new Date().toDateString(),price : 89, cloth : "This is pent shirt",client :{ name : "ahsan", email : "ahsan222@gmail.com",measurements : "jdhuwdiuwbuiw"}},{createdAt : new Date().toDateString(), returnDate :new Date().toDateString(),price : 89, cloth : "This is pent shirt",client :{ name : "ahsan", email : "ahsan222@gmail.com",measurements : "jdhuwdiuwbuiw"}}]
const PendingOrders=()=>{
    return(
        <div className={styles.pendCont}>
            {orders.map(eachOrder=>{
                return <PendingOrder order={eachOrder}/>
            })}
        </div>
    )
}
export default PendingOrders;