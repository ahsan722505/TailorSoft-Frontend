import Main from "./Components/Main/Main";
import { useSelector,useDispatch } from "react-redux";
import Confirmation from "./Components/Helpers/Confirmation";
import { uiActions } from "./store/ui-slice";
import { Fragment } from "react";

function App() {
  const meta=useSelector(state=>state.ui.meta);
  const dispatch =useDispatch();
  const toggleConfirm=()=>{
      dispatch(uiActions.toggleMeta(""));
  }
  return (
  <Fragment>
    <Main />
    {meta.show && <Confirmation message={meta.message} closeHandler={toggleConfirm}/>}

  </Fragment>
  );
}

export default App;
