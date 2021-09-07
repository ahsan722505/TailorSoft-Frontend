import styles from "./Dashboard.module.css";
import { uiActions } from "../../store/ui-slice";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const showDash = useSelector((state) => state.ui.showDash);
  return (
    <ul
      className={`${styles.features} ${
        showDash ? styles.animate : styles.close
      }`}
    >
      <li className={styles.brand}>
        <i class="fas fa-tshirt"></i> TailorSoft
      </li>
      <li>
        <i class="fas fa-shopping-cart"></i> Pending Orders
      </li>
      <li>
        <i class="fas fa-cart-plus"></i> New Order
      </li>
      <li>
        <i class="fas fa-envelope"></i> Email Client
      </li>
      <li>
        <i class="fas fa-user"></i> Search Clients
      </li>
      <li>
        <i class="fas fa-cog"></i> Settings
      </li>
    </ul>
  );
};
export default Dashboard;
