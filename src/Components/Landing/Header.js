import React from 'react'
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <li className={styles.company}>
                <i class="fas fa-tshirt"></i> TailorSoft
            </li>
            <div className={styles.linkCont}>

            <li className={styles.login}><Link to="/login" >Login</Link></li>
            <li className={styles.signup}><Link to="/signup">SignUp</Link></li>
            </div>
            
        </header>
    )
}

 

export default Header
