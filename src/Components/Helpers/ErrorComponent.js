import styles from "./ErrorComponent.module.css"
const ErrorComponent=(props)=>{
    return(
        <div className={styles.errorCont}>
            <h1>{props.message}</h1>
        </div>
    )
}
export default ErrorComponent;