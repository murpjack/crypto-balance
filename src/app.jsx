import "./styles/style.scss";

import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";

import LoginPage from "./scripts/components/LoginPage";
import CryptosPage from "./scripts/components/CryptosPage";
import { CalypsoContext, reducer } from "./scripts/context";
import initialState from "./scripts/initialState";
import getData from "./scripts/getData";

console.log(222, initialState);

const Calypso = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData();
  });

  return (
    <>
      <CalypsoContext.Provider value={{ state, dispatch }}>
        {state.isLoggedin ? <CryptosPage /> : <LoginPage />}
      </CalypsoContext.Provider>
    </>
  );
};

const container = document.getElementById("app");
ReactDOM.render(<Calypso />, container);
