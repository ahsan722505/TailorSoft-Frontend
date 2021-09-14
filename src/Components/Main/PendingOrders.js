import styles from "./PendingOrders.module.css";
import PendingOrder from "./PendingOrder";
import { Fragment } from "react";
import { useState } from "react";
const orders=[{ id : "dtug",createdAt : new Date().toISOString().split('T')[0], returnDate :new Date().toISOString().split('T')[0],price : 89, cloth : "This is kurta",client :{ name : "ahsan", email : "ahsan222@gmail.com",measurements : "jdhuwdiuwbu iw"}},{id :"dlrfx",createdAt : new Date().toISOString().split('T')[0], returnDate :new Date().toISOString().split('T')[0],price : 189, cloth : "This is coat",client :{ name : "jav", email : "jav222@gmail.com",measurements : "jdhuwdiuwbu iw"}},{id :"sisgvs",createdAt : new Date().toISOString().split('T')[0], returnDate :new Date().toISOString().split('T')[0],price : 189, cloth : "This is coat",client :{ name : "lal", email : "lal222@gmail.com",measurements : "wowww"}},]
const PendingOrders=()=>{
        const ordersPerPage=6;
     const [page,setPage]=useState(1);
     
     
    
    const prevPageHandler=()=>{
        if(page ==1) return;
        setPage((page)=>page-1)
    }
    const nextPageHandler=()=>{
        if(page*ordersPerPage >= orders.length) return;
        setPage((page)=>page+1)

        
    }
    const endingIndex=ordersPerPage*page;
    const startingIndex=endingIndex-ordersPerPage;
    const pendOrders=orders.slice(startingIndex,endingIndex)

    return(
        <Fragment>
        <div className={styles.pendCont}>
            {pendOrders.map(eachOrder=>{
                return <PendingOrder key={eachOrder.id} order={eachOrder}/>
            })}
            
        </div>
        <div className={styles.pageCont}>
                <button onClick={prevPageHandler} className={page ==1 ? styles.disabled : ""}>Previous Page</button>
                <button className={page*ordersPerPage >= orders.length ? styles.disabled : ""} onClick={nextPageHandler}>Next Page</button>
            </div>

        </Fragment>
    )
}
export default PendingOrders;