import React from 'react';
import styles from "./LoginSignUp.module.css";
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useState,useRef } from 'react';
import Loader from '../Helpers/Loader';
import { useHistory } from 'react-router';
import { authActions } from '../../store/auth-slice';
import { useDispatch } from 'react-redux';

const LoginSignUp = (props) => {
    const dispatch=useDispatch();
    const history=useHistory();

    const signUpMode=props.signUp;
    const [err,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const userOrEmailEl=useRef();
    const usernameEl=useRef();
    const emailEl=useRef();
    const passEl=useRef();
    const confirmPassEl=useRef();
    const emptyValidity=(value)=>{
        return value.trim().length !==0;
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        if(signUpMode){
            
            if(!emptyValidity(emailEl.current.value) || !emptyValidity(usernameEl.current.value) || !emptyValidity(passEl.current.value) || !emptyValidity(confirmPassEl.current.value)){
                    setError("Fields Should not be empty");
                    return;
            }
            if(passEl.current.value !== confirmPassEl.current.value){
                setError("Password and confirm password should be equal");
                return;
            }
            if(usernameEl.current.value.trim().length > 20){
                setError("Username could not be more than 20 characters");
                return;
            }
            
        }
        else{
            if(!emptyValidity(userOrEmailEl.current.value) || !emptyValidity(passEl.current.value) ){
                setError("Fields Should not be empty");
                return;
            }
        }
        setLoading(true);
        let response;
        let endPoint;
        let body;
        if(signUpMode){
                endPoint=`${process.env.REACT_APP_HOST}/api/postSignUp`;
                body={
                    username: usernameEl.current.value.trim(),
                    email: emailEl.current.value.trim(),
                    password: passEl.current.value,
                  }
        }else{
            endPoint=`${process.env.REACT_APP_HOST}/api/postLogin`;
            body={
                emailOrUser: userOrEmailEl.current.value.trim(),
                password: passEl.current.value,
              }
        }
        fetch(endPoint,{
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body),
          }).then(res=>{
            response=res;
            return res.json();
        }).then(data=>{
            if(response.status === 401) throw new Error(data.message)
            if(response.status === 500 || !response.ok) throw new Error("There was an error please try again.");
            localStorage.setItem("Authorization", `Bearer ${data.accessToken}`);
            dispatch(authActions.setAuthState({authenticated : true , username : data.username , email : data.email , ownerId : data.ownerId}));
            history.push("/main");
        }).catch(err=>{
            
                setLoading(false);
            
            setError(err.message)
            
        })

    }

    return (
        <Fragment>

        <div className={styles.formCont}>
        <h1 style={{color : "teal" , textAlign : "center"}}>{signUpMode ? "SignUp" : "Login"}</h1>
        { loading && <Loader/>}

        
        <form className={styles.form} onSubmit={submitHandler}>
            
            { !signUpMode && <input type="text" placeholder="username or email" ref={userOrEmailEl}/>}
            {signUpMode && <input type="email" placeholder="email" ref={emailEl}/> }
            {signUpMode && <input type="text" placeholder="username" ref={usernameEl}/>}
            <input type="password" placeholder="password" ref={passEl}/>
            {signUpMode && <input type="password" placeholder="confirm password" ref={confirmPassEl}/> }
            { err && <h2 style={{color : "red" , fontSize : "1.2rem" , margin : 0 , padding : 0}}>{err}</h2>}
            <button type="submit">{signUpMode ? "SignUp" : "Login"}</button>

        <p style={{color : "teal" , textAlign : "center"}}>{signUpMode ? "Don't have an account?" : "Already Have an account?"} <Link to={`/${!signUpMode ? "signup" : "login"}`} >{!signUpMode ? "SignUp" : "Login"}</Link></p>
        </form>
        </div>
        </Fragment>
    )
}

export default LoginSignUp
