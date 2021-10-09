import styles from "./ToggleButton.module.css";
import { useState } from "react";
const ToggleButton = () => {
    const [toggle, setToggle] = useState(false);

    const triggerToggle = () => {
        setToggle( !toggle )
    }
    return(
        <div onChange={triggerToggle} className={`${styles.wrg_toggle} ${toggle ? styles.wrg_toggle_checked : ''}`}>
            <div className={styles.wrg_toggle_container}>
                <div className={styles.wrg_toggle_check}>
                    <span>🌜</span>
                </div>
                <div className={styles.wrg_toggle_uncheck}>
                    <span>🌞</span>
                </div>
            </div>
            <div className={styles.wrg_toggle_circle}></div>
            <input className={styles.wrg_toggle_input} type="checkbox" aria-label="Toggle Button" />
        </div>
    )
}

export default ToggleButton;