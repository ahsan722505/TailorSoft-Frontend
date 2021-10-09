import styles from "./Settings.module.css";

import { useState,useRef } from "react";

import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { uiActions } from "../../store/ui-slice";
import { ordersActions } from "../../store/orders-slice";
import Confirmation from "../Helpers/Confirmation";
import Loader from "../Helpers/Loader";
import { useSelector } from "react-redux";
const Settings=()=>{
    const ownerId=useSelector(state=>state.auth.ownerId);
    const [err,setErr]=useState(null);
    const [currentPass,setCurrentPass]=useState("");
    const [newPass,setNewPass]=useState("");
    const [confirmNewPass,setConfirmNewPass]=useState("");
    const [loading,setLoading]=useState(false);
    
    const dispatch=useDispatch();
    const [warning,setWarning]=useState(false);
    const history=useHistory();
    const logoutHandler=()=>{
        localStorage.removeItem("Authorization");
        dispatch(authActions.resetState())
        dispatch(uiActions.resetState());
        dispatch(ordersActions.resetState())
        history.push("/welcome")

    }
    const [error,setError]=useState(null);
    const toggleWarning=()=>{
        setWarning(state=> !state);
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        setErr(null)
        if(currentPass.trim().length === 0 || newPass.trim().length === 0 || confirmNewPass.trim().length === 0){
            setErr("Fields should not be empty");
            return;
        }
        if(newPass !== confirmNewPass){
            setErr("Both passwords should be equal");
            return;
        }
        setLoading(true);
        fetch(`${process.env.REACT_APP_HOST}/api/changePassword?ownerId=${ownerId}`,{
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body : JSON.stringify({
                currentPassword : currentPass,
                newPassword : newPass
            })
        }).then(res=>{
            if(res.status == 500){
                throw new Error("There was an error please try again.");
            }
            if(res.status == 401){
                throw new Error("Invalid Password");
            }
            return res.json();
        }).then(data=>{
            setLoading(false)
            setCurrentPass("");
            setNewPass("");
            setConfirmNewPass("");
            dispatch(uiActions.toggleMeta("The password was changed successfully"));
        }).catch(err=>{
            setLoading(false);
            setErr(err.message);
        });
            
    }
    return(
        <div className={styles.settings}>
            <div className={styles.logoutCont}>
            <button onClick={toggleWarning}>Logout</button>

            </div>
            <form onSubmit={submitHandler} className={styles.changeCont}>
                { loading && <Loader/>}
                <p>Change Password</p>
                <input type="password" onChange={(e)=> setCurrentPass(e.target.value)} placeholder="current password" value={currentPass}/>
                <input type="password" onChange={(e)=> setNewPass(e.target.value)} placeholder="new password" value={newPass}/>
                <input type="password" onChange={(e)=> setConfirmNewPass(e.target.value)} placeholder="confirm new password" value={confirmNewPass}/>
                {err && <h1 style={{color : "red" , textAlign : "center" , fontSize : "1.2rem"}}>{err}</h1>}
                <button type="submit">Change</button>
            </form>
            {warning && <Confirmation warning={true} closeHandler={toggleWarning} proceedHandler={logoutHandler} message="Are you sure you want to logout?"/>}

        </div>
    )
}
export default Settings;