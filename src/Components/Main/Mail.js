import styles from "./Mail.module.css";
import SearchExisting from "./SearchExisting";
import Message from "../Helpers/Message";
import { useState,Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Loader from "../Helpers/Loader";
const Mail=(props)=>{
    const dispatch=useDispatch();
    const [email,setEmail]=useState("");
    const [subject,setSubject]=useState("");
    const [mail,setMail]=useState("");
    const [error,setError]=useState(null);
    const [showLoader,setLoader]=useState(false);
    const useHandler=(data)=>{
        setEmail(data.email)
        if(error) setError(null)
        
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        setError(null);
        if(email.trim().length === 0 || mail.trim().length === 0){
            setError("Fields should not be empty");
            return;
        }
        setLoader(true);
        fetch(`${process.env.REACT_APP_HOST}/api/postMail`,{
            method : "POST",
            headers: { "Content-type": "application/json" },
            body : JSON.stringify({email,subject,mail})
        }).then(res=>{
            setLoader(false);
            if(res.status === 500 || !res.ok){
                throw new Error("There was an error please try again.")
            }
            setEmail("");
            setMail("");
            setSubject("");
            dispatch(uiActions.toggleMeta("The email was sent successfully"));
        }).catch(err=>{
                 setLoader(false);
                dispatch(uiActions.toggleMeta(`${err.message}`));
        })

    }
    const changeEmailHandler=(e)=>{
        if(error) setError(null);
        setEmail(e.target.value);
    }
    const changeSubjectHandler=(e)=>{
        if(error) setError(null);
        setSubject(e.target.value);
    }
    const changeMailHandler=(e)=>{
        if(error) setError(null);
        setMail(e.target.value);
    }
    return(
        <Fragment>
            {showLoader && <Loader/>}
            {error && <Message message={error}/>}

        
        <SearchExisting useHandler={useHandler} />
        <form onSubmit={submitHandler} className={styles.form}>
            
            
            <input type="email" id="email" placeholder="to" onChange={changeEmailHandler} value={email}/>
            <input type="text" id="subject" placeholder="subject" value={subject} onChange={changeSubjectHandler}/>
            <textarea placeholder="compose email" rows="10" onChange={changeMailHandler} value={mail}/>
            <button className={styles.btn} type="submit">Send</button>

            
        </form>
        </Fragment>
    )
}
export default Mail;