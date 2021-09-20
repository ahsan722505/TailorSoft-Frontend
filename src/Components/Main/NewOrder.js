import styles from "./NewOrder.module.css";
import TextField from '@material-ui/core/TextField';
import { useState } from "react";
import { Fragment } from "react";
import Loader from "../Helpers/Loader";
import ErrorComponent from "../Helpers/ErrorComponent";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Confirmation from "../Helpers/Confirmation";
import { ordersActions } from "../../store/orders-slice";



// require("dotenv").config();
const NewOrder = (props) => {
  const updateMode= props.order ? true : false; 
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
  const [showConfirmation,setConfirmation]=useState(false);
  const [showUpdateSuccess,setUpdateSuccess]=useState(false);
  
  
  const addOrderHandler=(event)=>{
    
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
      endPoint=`${process.env.REACT_APP_HOST}/api/postOrder`
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
              clientId : updateMode ? props.order.clientId._id : null,
              orderId : updateMode ? props.order._id : null
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
                  dispatch(ordersActions.replaceOrder(data.clientData))
              }else{
                dispatch(ordersActions.addOrder(data.clientData))
                setName("")
                setPrice("")
                setDate("2017-05-24")
                setEmail("")
                setMeasurements("")
                setCloth("")
                setConfirmation(true)
                
              }
              

            }).catch((err)=>{
              err.message="There was an error please try again."
              setLoading(false)
              setForm(true);
              setError(err.message)
            })
    


    
    

  }
  const closeConfirmation=()=>{
    setConfirmation(false);
  }
  return(
    <Fragment>
      {showUpdateSuccess && <h1>Order was updated successfully.</h1>}
      {showLoading && <Loader/>}
      {showConfirmation && <Confirmation message="The order was added" closeHandler={closeConfirmation} />}

    
    {error && <ErrorComponent message={error}/>}
     {showForm && <form className={styles.newOrder} onSubmit={addOrderHandler}>
    
    <label htmlFor="name">Name:</label>
    <input id="name" type="text" value={name} onChange={(e)=> {setName(e.target.value); setUpdateSuccess(false)}}/>
    <label htmlFor="email">Email:</label>
    <input id="email" type="email"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
    <label htmlFor="measurements">Measurements:</label>
    <textarea id="measurements"rows="10" cols="50" value={measurements} onChange={(e)=> setMeasurements(e.target.value)}></textarea>
    <TextField
    id="date"
    label="Return Date"
    type="date"
    defaultValue={date}
    className={styles.mb}
    onChange={(e)=> setDate(e.target.value)}
    
    InputLabelProps={{
      shrink: true,
    }}
  />
  <label htmlFor="price">Price:</label>
  <input type="text" id="price" value={price} onChange={(e)=> setPrice(e.target.value)}/>
  <label htmlFor="cloth">Stitch Details:</label>
  <textarea id="cloth" rows="10" cols="50" value={cloth} onChange={(e)=> setCloth(e.target.value)}></textarea>
  <div className={styles.btnCont}><button type="submit">{updateMode ? "Update" : "Add"}</button></div>
  </form>}
  </Fragment>
  );
};
export default NewOrder;
