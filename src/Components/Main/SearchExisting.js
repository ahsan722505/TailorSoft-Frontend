import styles from "./SearchExisting.module.css";
import Client from "./Client";
const clients=[{name : "ahsan tahir" , email : "ahsan@gmail.com", measurements : "jhbfygfby"},{name : "jav" , email : "jav@gmail.com", measurements : "sfjnf"},{name : "jav" , email : "jav@gmail.com", measurements : "sfjnf"},{name : "jav" , email : "jav@gmail.com", measurements : "sfjnf"},{name : "jav" , email : "jav@gmail.com", measurements : "sfjnf"}]
const SearchExisting=(props)=>{
    return(
        <div className={`${styles.searchCont} ${clients.length !== 0 ? styles.results : ""}`}>
                <input type="text" placeholder="search by name" className={`${clients.length !== 0 ? styles.mb_0 : ""}`}/>
                { clients.length !==0 && <hr/>}
                <ul className={styles.clientsCont}>
                {clients.map(client=> <Client client={client}/>)}

                </ul>
        </div>
    )
}
export default SearchExisting;