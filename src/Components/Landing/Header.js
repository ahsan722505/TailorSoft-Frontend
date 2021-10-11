import React from 'react'
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <li className={styles.company}>
                <i class="fas fa-tshirt"></i> TailorSoft
            </li>
            
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="/signup">SignUp</Link></li>
        </header>
    )
}

 

export default Header
