import styles from "./Message.module.css"
const Message=(props)=>{
    return(
        <div className={styles.errorCont} style={props.style}>
            <h1>{props.message}</h1>
        </div>
    )
}
export default Message;