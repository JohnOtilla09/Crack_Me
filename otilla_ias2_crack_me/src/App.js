import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import CrackPage from "./components/CrackPage/CrackPage";

import styles from './App.module.css';

function App() {
  const [ islogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storeUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storeUserLoggedInInformation === "1") {
      setIsLogin(true);
    }
  }, []);

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', 1);
    setIsLogin(true)
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLogin(false);
  };

  return (
    <div className={styles.app}>
      {!islogin ? <Login onLogin={loginHandler} /> : <CrackPage onLogout={logoutHandler}/>}
    </div>
  );
}

export default App;
