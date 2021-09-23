import styles from "./PendingOrders.module.css";
import PendingOrder from "./PendingOrder";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import Loader from "../Helpers/Loader";
import ErrorComponent from "../Helpers/Message";
import { useSelector,useDispatch } from "react-redux";
import { ordersActions } from "../../store/orders-slice";
import { uiActions } from "../../store/ui-slice";
import Message from "../Helpers/Message";
import Confirmation from "../Helpers/Confirmation";
const PendingOrders=()=>{
    console.log("rendering pending orders")
    const firstRender=useSelector(state=>state.ui.firstRender)
    const [showOrders,setShowOrders]= useState(firstRender ? false : true)
    const [showLoader,setLoader]= useState( firstRender ? true : false)
    const [error,setError]=useState(null)
    const [orders,setOrders]=useState([]);
    
    const dispatch=useDispatch()
    let redOrders=useSelector(state=>state.porders.orders)
    // console.log(redOrders)
    
    
        
    

    
        
    
    useEffect(()=>{
        if(firstRender){
            dispatch(uiActions.toggleFirstRender())
            
        

        
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
            dispatch(ordersActions.addOrders(data.orders))
            setOrders(data.orders)
            
        }).catch(err=>{
            if(err.message === "Failed to fetch") err.message="There was an error please try again."
            setLoader(false)
            setError(err.message)
        })
    }else{
        setOrders(redOrders)
    }
    },[redOrders])

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
    console.log(pendOrders)
    const toggleLoaderHandler=()=>{
        setLoader(state=> !state);
    }
    

    return(
            <Fragment> 
                {error && <ErrorComponent message={error}/>}
            {showLoader && <Loader/>}
            {orders.length===0 && !showLoader && !error && showOrders && <Message message="You have no pending orders" style={{color : "teal"}}/>}
            {showOrders && orders.length !== 0 &&  !error &&<Fragment>

            
         <div className={styles.pendCont}>
            {pendOrders.map(eachOrder=>{
                return <PendingOrder key={eachOrder._id} order={eachOrder} toggleLoader={toggleLoaderHandler} />
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