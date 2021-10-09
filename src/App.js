import Main from "./Components/Main/Main";
import Landing from "./Components/Landing/Landing";
import PageNotFound from "./Components/Helpers/PageNotFound";
import LoginSignUp from "./Components/Auth/LoginSignUp";
import { useSelector,useDispatch } from "react-redux";
import Confirmation from "./Components/Helpers/Confirmation";
import { uiActions } from "./store/ui-slice";
import { Fragment, useEffect } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { authActions } from "./store/auth-slice";
import { useState } from "react";
import Loader from "./Components/Helpers/Loader";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loading,setLoading]=useState(true);
  const [startApp,setStartApp]=useState(false);
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_HOST}/api/getAuthState`,{
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    }).then(res=>{
      if(res.status === 500 || res.status === 401 || !res.ok){
        const err=new Error();
        err.statusCode=res.status;
        throw err;
          
      }
      return res.json();
      
    }).then((data)=>{
      console.log(data);
      dispatch(authActions.setAuthState({authenticated : data.authenticated , username : data.username , email : data.email , ownerId : data.ownerId}))
      setLoading(false);
      setStartApp(true);
    }).catch(err=>{
      setLoading(false);
      if(err.statusCode === 500 || err.statusCode === 401){
        setStartApp(true);
        dispatch(authActions.setAuthState({authenticated : false}));
      }else{

        dispatch(uiActions.toggleMeta("There was an error please try  again."));
      }
    })
  },[]);
  const authenticated=useSelector(state=>state.auth.authenticated);
  const meta=useSelector(state=>state.ui.meta);
  const dispatch =useDispatch();
  const toggleConfirm=()=>{
      dispatch(uiActions.toggleMeta(""));
  }
  return (
  <Fragment>
    { loading && <Loader/>}
    {startApp && <Switch>

    <Route path="/" exact>
      {authenticated  && <Redirect to="/main"/>}
      {!authenticated && <Redirect to="/welcome"/>}
    </Route>
    <Route path="/welcome" exact>
        <Landing/>
    </Route>
    <Route path="/main" exact>
      
        { authenticated && <Main />}
        {!authenticated && <Redirect to="/welcome"/>}
    </Route>
    <Route path="/login">
        <LoginSignUp/>
    </Route>
    <Route path="/signup">
        <LoginSignUp signUp={true}/>
    </Route>
    <Route path="*" exact>
      <PageNotFound/>
    </Route>
    
    </Switch>}
    {meta.show && <Confirmation message={meta.message} closeHandler={toggleConfirm}/>}

  </Fragment>
  );
}

export default App;
