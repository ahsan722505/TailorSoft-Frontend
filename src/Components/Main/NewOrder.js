import styles from "./NewOrder.module.css";
import TextField from '@material-ui/core/TextField';
import { useState } from "react";
import { Fragment } from "react";
import Loader from "../Helpers/Loader";

import { useDispatch,useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Confirmation from "../Helpers/Confirmation";
import { ordersActions } from "../../store/orders-slice";
import Message from "../Helpers/Message";
import SearchExisting from "./SearchExisting";



// require("dotenv").config();
const NewOrder = (props) => {
  const updateMode= props.order ? true : false; 
  const ownerId=useSelector(state=>state.auth.ownerId);
  const dispatch=useDispatch();

  const [error,setError]=useState(false);
  const [name,setName]=useState( updateMode ? props.order.clientId.name : "");
  const [email,setEmail]=useState( updateMode ? props.order.clientId.email :"");
  const [measurements,setMeasurements]=useState( updateMode ? props.order.clientId.measurements :"");
  const [date,setDate]=useState( updateMode ? props.order.returnDate : "2017-05-24");
  const [price,setPrice]=useState(updateMode ? props.order.price : "");
  const [cloth,setCloth]=useState(updateMode ? props.order.cloth : "");
  const [showLoading,setLoading]=useState(false);
  const [showForm,setForm]=useState(true);
  
  const [showUpdateSuccess,setUpdateSuccess]=useState(false);
  const [id,setId]=useState(null);
  
  
  const addOrderHandler=(event)=>{
    setError(false)
    setUpdateSuccess(false)
    
    event.preventDefault();
    // console.log(name,email,measurements,price,date,cloth)
    const data=[name,measurements,price,date,cloth];
    let e=false;
    data.forEach(each=>{
      // console.log(each)
      if(each.trim().length === 0){
          setError("Fields Should not be empty.");
          e=true;
      }
    })
    if(e) return;
    setLoading(true);
    if(!updateMode){
      setForm(false);

    }
    let endPoint;
    if(updateMode){
      endPoint=`${process.env.REACT_APP_HOST}/api/updateOrder`
    }else{
      endPoint=`${process.env.REACT_APP_HOST}/api/postOrder?existing=${id ? true : false}`
    }
    let method;
    if(updateMode){
      method="PUT"
    }else{
      method="POST"
    }
    fetch(endPoint,{
            method: method,
            headers: { "Content-type": "application/json" },
            body : JSON.stringify({
              name : name,
              email : email,
              measurements : measurements,
              price : price,
              returnDate : date,
              cloth : cloth,
              clientId : updateMode ? props.order.clientId._id : id,
              orderId : updateMode ? props.order._id : null,
              ownerId : ownerId,
            })}).then((res)=>{
                if(res.status === 500 || !res.ok){
                    
                    throw new Error("There was an error please try again.")
                }
                return res.json()
            }).then((data)=>{
              console.log(data);
              data.clientData.returnDate=data.clientData.returnDate.split('T')[0]
              data.clientData.createdAt=data.clientData.createdAt.split('T')[0]
              setLoading(false)
              setForm(true);
              if(updateMode){
                setUpdateSuccess(true);
                  // dispatch(uiActions.toggleMeta("Order was updated successfully."));
                  dispatch(ordersActions.replaceOrder(data.clientData))
              }else{
                dispatch(ordersActions.addOrder(data.clientData))
                dispatch(uiActions.toggleMeta("The order was added"))
                setName("")
                setPrice("")
                setDate("2017-05-24")
                setEmail("")
                setMeasurements("")
                setCloth("")
                setId(null);
                // setConfirmation(true)
                
              }
              

            }).catch((err)=>{
              err.message="There was an error please try again."
              setLoading(false)
              setForm(true);
              setError(err.message)
            })
    


    
    

  }
  const nameChangeHandler=(e)=>{
      setName(e.target.value);
      if(showUpdateSuccess) setUpdateSuccess(false);
      if(error) setError(false);
  }
  const emailChangeHandler=(e)=>{
    setEmail(e.target.value);
    if(showUpdateSuccess) setUpdateSuccess(false);
    if(error) setError(false);
}
const measurementsChangeHandler=(e)=>{
  setMeasurements(e.target.value);
  if(showUpdateSuccess) setUpdateSuccess(false);
  if(error) setError(false);
}
const dateChangeHandler=(e)=>{
  setDate(e.target.value);
  if(showUpdateSuccess) setUpdateSuccess(false);
  if(error) setError(false);
}
const clothChangeHandler=(e)=>{
  setCloth(e.target.value);
  if(showUpdateSuccess) setUpdateSuccess(false);
  if(error) setError(false);
}
const priceChangeHandler=(e)=>{
  setPrice(e.target.value);
  if(showUpdateSuccess) setUpdateSuccess(false);
  if(error) setError(false);
}
const useHandler=(data)=>{
  setName(data.name);
  setEmail(data.email);
  setMeasurements(data.measurements);
  setId(data._id);
}
  return(
    <Fragment>

      {showLoading && <Loader/>}
      

    
      {showUpdateSuccess && <Message message="Order was updated successfully." style={{color : "black"}}/>}
    {error && <Message message={error} style={{color : "red"}}/>}
      { showForm && !updateMode && <SearchExisting useHandler={useHandler}/>}
     {showForm && <form className={`${styles.newOrder}`} onSubmit={addOrderHandler}>
      
    
    <label htmlFor="name">Name:</label>
    <input id="name" type="text" value={name} onChange={nameChangeHandler}/>
    <label htmlFor="email">Email:</label>
    <input id="email" type="email"  value={email} onChange={emailChangeHandler}/>
    <label htmlFor="measurements">Measurements:</label>
    <textarea id="measurements"rows="10" cols="50" value={measurements} onChange={measurementsChangeHandler}></textarea>
    <TextField
    id="date"
    label="Return Date"
    type="date"
    defaultValue={date}
    className={styles.mb}
    onChange={dateChangeHandler}
    
    InputLabelProps={{
      shrink: true,
    }}
  />
  <label htmlFor="price">Price:</label>
  <input type="text" id="price" value={price} onChange={priceChangeHandler}/>
  <label htmlFor="cloth">Stitch Details:</label>
  <textarea id="cloth" rows="10" cols="50" value={cloth} onChange={clothChangeHandler}></textarea>
  <div className={styles.btnCont}><button className={styles.btn} type="submit">{updateMode ? "Update" : "Add"}</button></div>
  </form>}
  </Fragment>
  );
};
export default NewOrder;
