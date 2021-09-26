import styles from "./Client.module.css"
import AhsanModal from "../Helpers/AhsanModal";
import { useState } from "react";
import { Fragment } from "react";
const Client=(props)=>{
    const [showDetails,setDetails]=useState(false);
    const showDetailsHandler=(e)=>{
        if(e.target.value === "button"){
            props.useHandler(props.client);
            return;
        }
        setDetails(true);
    }

    return(
        <Fragment>

        
        <p onClick={showDetailsHandler} className={styles.client}>{props.client.name} <button value="button" type="button">use</button></p>
        
        { showDetails && <AhsanModal closeHandler={()=> setDetails(false)}>
                        <div>
                            <p>name : {props.client.name}</p>
                            <p>email : {props.client.email}</p>
                            <p>measurements : {props.client.measurements}</p>
                        </div>
            </AhsanModal>}
        </Fragment>
    )
}
export default Client;