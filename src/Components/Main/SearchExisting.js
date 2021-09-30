import styles from "./SearchExisting.module.css";
import Client from "./Client";
import Loader from "../Helpers/Loader";
import Message from "../Helpers/Message";
import { useState,useRef } from "react";

// const clients=[{name : "ahsan tahir" , email : "ahsan@gmail.com", measurements : "jhbfygfby"},{name : "jav" , email : "jav@gmail.com", measurements : "sfjnf"},{name : "jav" , email : "jav@gmail.com", measurements : "sfjnf"},{name : "jav" , email : "jav@gmail.com", measurements : "sfjnf"},{name : "jav" , email : "jav@gmail.com", measurements : "sfjnf"}]
const SearchExisting=(props)=>{
    const [showResults,setResults]=useState(false);
    const [showLoading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [clients,setClients]=useState([]);
    const inputEl=useRef();
    const submitHandler=(e)=>{
            e.preventDefault();
            setResults(false)
            if(inputEl.current.value.trim().length ===0) return;
            setLoading(true);
            fetch(`${process.env.REACT_APP_HOST}/api/getClient?name=${inputEl.current.value.trim()}`).then((res)=>{
                if(res.status === 500 || !res.ok) throw new Error("There was an error please try again.");
                
                return res.json();

            }).then((data)=>{
                setResults(true);
                setLoading(false);
                setClients(data.clients);
            }).catch(err=>{
                setResults(true);
                setLoading(false);
                setError(err.message);
                
            });
    }
    const inputHandler=()=>{
        if(showResults) setResults(false);
    }
    const useHandler=(data)=>{
        setResults(false);
        inputEl.current.value="";
        props.useHandler(data);
    }

    return(
        <form className={`${styles.searchCont} ${(showResults || showLoading) ? styles.results : ""}`} onSubmit={submitHandler} style={{...props.style}}>
                <input type="text" placeholder="search by name" ref={inputEl} className={`${showResults ? styles.mb_0 : ""}`} onChange={inputHandler}/>
                { (showResults || showLoading) && <hr />}
                { showResults && clients.length !==0 && !error && <ul className={styles.clientsCont}>
                {clients.map(client=> <Client useHandler={useHandler} client={client}/>)}

                </ul>}
                {showResults && clients.length==0 && !error &&<Message message="No client with this name exists."/>}
                {showResults && error && <Message message={error}/>}
                {showLoading && <Loader/>}
        </form>
    )
}
export default SearchExisting;