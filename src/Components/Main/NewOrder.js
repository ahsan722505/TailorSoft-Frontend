import styles from "./NewOrder.module.css";
import TextField from '@material-ui/core/TextField';
const NewOrder = (props) => {
  // console.log(props.order.returnDate + "jshdjsdbjs")
  const updateMode= props.order ? true : false; 
  const dateHandler=(e)=>{
    console.log(new Date(e.target.value))
  }
  return( <form className={styles.newOrder}>
    
    <label htmlFor="name">Name:</label>
    <input id="name" type="text" value={updateMode ? props.order.client.name : ""}/>
    <label htmlFor="email">Email:</label>
    <input id="email" type="email" value={updateMode ? props.order.client.email : ""}/>
    <label htmlFor="measurements">Measurements:</label>
    <textarea id="measurements"rows="4" cols="50" value={updateMode ? props.order.client.measurements : ""}></textarea>
    <TextField
    id="date"
    label="Return Date"
    type="date"
    defaultValue={updateMode ?  props.order.returnDate : "2017-05-24"}
    className={styles.mb}
    onChange={dateHandler}
    
    InputLabelProps={{
      shrink: true,
    }}
  />
  <label htmlFor="price">Price:</label>
  <input type="text" id="price" value={updateMode ? props.order.price : ""}/>
  <label htmlFor="cloth">Stitch Details:</label>
  <textarea id="cloth" rows="4" cols="50" value={updateMode ? props.order.cloth : ""}></textarea>
  </form>);
};
export default NewOrder;
