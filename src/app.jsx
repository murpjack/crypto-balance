import "./styles/style.scss";

import React from "react";
import ReactDOM from "react-dom";

import LoginPage from "./scripts/LoginPage";
import CryptosPage from "./scripts/CryptosPage";

const Calypso = () => {
  // const {isLoggedIn} = useReducer(calypsoContext);
  const isLoggedin = false;
  return <>{isLoggedin ? <CryptosPage /> : <LoginPage />}</>;
};

const container = document.getElementById("app");
ReactDOM.render(<Calypso />, container);
