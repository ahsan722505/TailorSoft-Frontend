import styles from "./Main.module.css";
import { Fragment } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Result from "./Result";
import DashResult from "./DashResult";
const Main = () => {
  return (
    <Fragment>
      <Header />
      <DashResult/>
    </Fragment>
  );
};
export default Main;
