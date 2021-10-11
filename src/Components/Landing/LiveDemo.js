import React from 'react'
import styles from "./LiveDemo.module.css";

const LiveDemo = () => {
    return (
        <div className={styles.liveDemo}>
            <div className={styles.info}>
                <i class="fas fa-info-circle"></i> For a demo, login using the credentials given below:
            </div>
            <div className={styles.username}>
                <p>username:</p>
                <p>tailorsoft</p>
            </div>
            <div className={styles.pass}>
                <p>password:</p>
                <p>tailorsoft123</p>
            </div>
        </div>
    )
}

export default LiveDemo
