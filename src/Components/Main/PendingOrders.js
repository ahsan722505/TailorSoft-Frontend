import styles from "./PendingOrders.module.css";
import PendingOrder from "./PendingOrder";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import Loader from "../Helpers/Loader";
import ErrorComponent from "../Helpers/ErrorComponent";
import { useSelector,useDispatch } from "react-redux";
const PendingOrders=()=>{
    const [showOrders,setShowOrders]= useState(false)
    const [showLoader,setLoader]= useState(true)
    const [error,setError]=useState(null)
    const [orders,setOrders]=useState([]);
    const sendRequest=useSelector(state=>state.ui.sendRequest)
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_HOST}/api/getPendOrders`).then((res)=>{
            
            
            if(res.status === 500 || !res.ok){
                throw new Error("There was an error please try again.")
            }
            return res.json()
        }).then((data)=>{
            data.orders.forEach(order=>{
                order.returnDate=order.returnDate.split('T')[0]
                order.createdAt=order.createdAt.split('T')[0]
            })
            setShowOrders(true);
            setLoader(false)
            setOrders(data.orders)
            
        }).catch(err=>{
            if(err.message === "Failed to fetch") err.message="There was an error please try again."
            setLoader(false)
            setError(err.message)
        })
    },[])
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
                {error && <ErrorComponent message={error}/>}
            {showLoader && <Loader/>}
            {orders.length===0 && !showLoader && !error && showOrders && <h1 style={{color : "teal",fontSize : "1.5rem" , width : "30%", margin : "0 auto"}}>You have no pending orders</h1>}
            {showOrders && orders.length !== 0 &&  !error &&<Fragment>

            
         <div className={styles.pendCont}>
            {pendOrders.map(eachOrder=>{
                return <PendingOrder key={eachOrder._id} order={eachOrder}/>
            })}
            
        </div>
        <div className={styles.pageCont}>
                <button onClick={prevPageHandler} className={page ==1 ? styles.disabled : ""}>Previous Page</button>
                <button className={page*ordersPerPage >= orders.length ? styles.disabled : ""} onClick={nextPageHandler}>Next Page</button>
            </div>
            </Fragment>}
            </Fragment>

        
    )
}
export default PendingOrders;