import styles from "./DashResult.module.css";
import Dashboard from "./Dashboard";
import Result from "./Result";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const DashResult = () => {
  const dispatch = useDispatch();
  const backdropHandler = () => {
    dispatch(uiActions.toggleDashHandler());
  };
  const showDash = useSelector((state) => state.ui.showDash);
  return (
    <div className={styles.dashResCont}>
      <Dashboard />
      <Result />
      {showDash && (
        <div className={styles.backdrop} onClick={backdropHandler}></div>
      )}
    </div>
  );
};
export default DashResult;
