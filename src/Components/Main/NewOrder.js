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
  const dispatch=useDispatch();

  const [error,setError]=useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [measurements,setMeasurements]=useState("");
  const [date,setDate]=useState("2017-05-24");
  const [price,setPrice]=useState("");
  const [cloth,setCloth]=useState("");
  const [showLoading,setLoading]=useState(false);
  const [showForm,setForm]=useState(true);
  const [showConfirmation,setConfirmation]=useState(false);
  
  const updateMode= props.order ? true : false; 
  
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
    setForm(false);
    fetch(`${process.env.REACT_APP_HOST}/api/postOrder`,{
            method: "POST",
            headers: { "Content-type": "application/json" },
            body : JSON.stringify({
              name : name,
              email : email,
              measurements : measurements,
              price : price,
              returnDate : date,
              cloth : cloth
            })}).then((res)=>{
              // setLoading(false);
              // setForm(true);
              console.log(res);
                if(res.status === 500 || !res.ok){
                    console.log("it is bad")
                    throw new Error("There was an error please try again.")
                }
                return res.json()
            }).then((data)=>{
              console.log(data);
              data.clientData.returnDate=data.clientData.returnDate.split('T')[0]
              data.clientData.createdAt=data.clientData.createdAt.split('T')[0]
              dispatch(ordersActions.addOrder(data.clientData))
              setLoading(false)
              setForm(true);
              setName("")
              setPrice("")
              setDate("2017-05-24")
              setEmail("")
              setMeasurements("")
              setCloth("")
              setConfirmation(true)
              

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
      {showLoading && <Loader/>}
      {showConfirmation && <Confirmation message="The order was added" closeHandler={closeConfirmation} />}

    
    {error && <ErrorComponent message={error}/>}
     {showForm && <form className={styles.newOrder} onSubmit={addOrderHandler}>
    
    <label htmlFor="name">Name:</label>
    <input id="name" type="text" value={updateMode ? props.order.clientId.name : name} onChange={(e)=> setName(e.target.value)}/>
    <label htmlFor="email">Email:</label>
    <input id="email" type="email"  value={updateMode ? props.order.clientId.email : email} onChange={(e)=> setEmail(e.target.value)}/>
    <label htmlFor="measurements">Measurements:</label>
    <textarea id="measurements"rows="10" cols="50" value={updateMode ? props.order.clientId.measurements : measurements} onChange={(e)=> setMeasurements(e.target.value)}></textarea>
    <TextField
    id="date"
    label="Return Date"
    type="date"
    defaultValue={updateMode ?  props.order.returnDate : date}
    className={styles.mb}
    onChange={(e)=> setDate(e.target.value)}
    
    InputLabelProps={{
      shrink: true,
    }}
  />
  <label htmlFor="price">Price:</label>
  <input type="text" id="price" value={updateMode ? props.order.price : price} onChange={(e)=> setPrice(e.target.value)}/>
  <label htmlFor="cloth">Stitch Details:</label>
  <textarea id="cloth" rows="10" cols="50" value={updateMode ? props.order.cloth : cloth} onChange={(e)=> setCloth(e.target.value)}></textarea>
  <div className={styles.btnCont}><button type="submit">{updateMode ? "Update" : "Add"}</button></div>
  </form>}
  </Fragment>
  );
};
export default NewOrder;
