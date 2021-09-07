import styles from "./Header.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useSelector } from "react-redux";
const Header = () => {
  const showDash = useSelector((state) => state.ui.showDash);
  const dispatch = useDispatch();
  const hamHandler = () => {
    dispatch(uiActions.toggleDashHandler());
  };
  return (
    <header className={`${styles.header} ${showDash ? styles.dashOn : ""}`}>
      <div className={styles.company}>
        <i class="fas fa-tshirt"></i> TailorSoft
      </div>
      <div className={styles.hamCont} onClick={hamHandler}>
        <i class="fas fa-bars"></i>
      </div>
      <div className={styles.account}>
        <i class="fas fa-user"></i>
        <p className={styles.accountHolder}>Ahsan</p>
      </div>
    </header>
  );
};
export default Header;
