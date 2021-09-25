import styles from "./Client.module.css"
const Client=(props)=>{
    return(
        <p className={styles.client}>{props.client.name} <button>use</button></p>
    )
}
export default Client;