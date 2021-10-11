import styles from "./Landing.module.css";

import Header from "./Header";
import LiveDemo from "./LiveDemo";
import Features from "./Features";
import { Fragment } from "react";
const Landing=(props)=>{
    return(
        <Fragment>
            <Header/>
            <LiveDemo/>
            <Features/>
        </Fragment>
    )
}
export default Landing;
