import styles from "./Result.module.css";
import NewOrder from "./NewOrder";
import Settings from "./Settings";
import PendingOrders from "./PendingOrders";
import SearchClients from "./SearchClients";
import Mail from "./Mail";
import { useSelector } from "react-redux";
const Result = () => {
  const { showPendingOrders, showNewOrder, showSearchClients, showSettings , showMails } =
    useSelector((state) => state.ui);
  // console.log(showPendingOrders, showNewOrder, showSearchClients, showSettings);
  return (
    <div className={styles.resultCont}>
      {showPendingOrders && <PendingOrders />}
      {showNewOrder && <NewOrder />}
      {showSearchClients && <SearchClients />}
      {showSettings && <Settings />}
      {showMails && <Mail/>}
    </div>
  );
};
export default Result;
