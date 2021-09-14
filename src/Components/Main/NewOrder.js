import styles from "./NewOrder.module.css";
import TextField from '@material-ui/core/TextField';
const NewOrder = () => {
  const dateHandler=(e)=>{
    console.log(new Date(e.target.value))
  }
  return( <form className={styles.newOrder}>
    
    <label htmlFor="name">Name:</label>
    <input id="name" type="text"/>
    <label htmlFor="email">Email:</label>
    <input id="email" type="email"/>
    <label htmlFor="measurements">Measurements:</label>
    <textarea id="measurements"rows="4" cols="50"></textarea>
    <TextField
    id="date"
    label="Return Date"
    type="date"
    defaultValue="2017-05-24"
    className={styles.mb}
    onChange={dateHandler}
    
    InputLabelProps={{
      shrink: true,
    }}
  />
  <label htmlFor="price">Price:</label>
  <input type="text"/>
  <label htmlFor="cloth">Stitch Details:</label>
  <textarea id="cloth" rows="4" cols="50"></textarea>
  </form>);
};
export default NewOrder;
