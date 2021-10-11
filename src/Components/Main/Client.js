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

        
        <p onClick={showDetailsHandler} className={styles.client}>{props.client.name} <button className={styles.btn} value="button" type="button">use</button></p>
        
        { showDetails && <AhsanModal closeHandler={()=> setDetails(false)}>
                        <div className={styles.detailCont}>
                            <p><span>name : </span>{props.client.name}</p>
                            <p><span>email : </span>{props.client.email}</p>
                            
                            <div className={styles.measurements}>
                                <p><span>measurements:</span></p>
                                <div>
                                    {props.client.measurements}
                                </div>

                            </div>
                        </div>
            </AhsanModal>}
        </Fragment>
    )
}
export default Client;