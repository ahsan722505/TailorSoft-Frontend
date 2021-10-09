import styles from "./Landing.module.css";
import { Link } from "react-router-dom";
const Landing=(props)=>{
    return(
        <div>
                <Link to="/login" >Login</Link>
                <Link to="/signup">SignUp</Link>
        </div>
    )
}
export default Landing;