import styles from "./Dashboard.module.css";
import { uiActions } from "../../store/ui-slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const showDash = useSelector((state) => state.ui.showDash);
  const { showPendingOrders, showNewOrder, showSearchClients, showSettings } =
    useSelector((state) => state.ui);
  return (
    <ul
      className={`${styles.features} ${
        showDash ? styles.animate : styles.close
      }`}
    >
      <li className={styles.brand}>
        <i class="fas fa-tshirt"></i> TailorSoft
      </li>
      <li
        className={showPendingOrders ? styles.selected : ""}
        onClick={() => {
          dispatch(uiActions.showPendingOrdersHandler());
          dispatch(uiActions.toggleDashHandler());
        }}
      >
        <i class="fas fa-shopping-cart"></i> Pending Orders
      </li>
      <li
        className={showNewOrder ? styles.selected : ""}
        onClick={() => {
          dispatch(uiActions.showNewOrderHandler());
          dispatch(uiActions.toggleDashHandler());
        }}
      >
        <i class="fas fa-cart-plus"></i> New Order
      </li>
      {/* <li>
        <i class="fas fa-envelope"></i> Email Client
      </li> */}
      <li
        className={showSearchClients ? styles.selected : ""}
        onClick={() => {
          dispatch(uiActions.showSearchClientsHandler());
          dispatch(uiActions.toggleDashHandler());
        }}
      >
        <i class="fas fa-user"></i> Search Clients
      </li>
      <li
        className={showSettings ? styles.selected : ""}
        onClick={() => {
          dispatch(uiActions.showSettingsHandler());
          dispatch(uiActions.toggleDashHandler());
        }}
      >
        <i class="fas fa-cog"></i> Settings
      </li>
    </ul>
  );
};
export default Dashboard;
