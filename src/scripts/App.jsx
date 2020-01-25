import React, { useEffect, useReducer } from "react";

import LoginPage from "./components/LoginPage";
import CryptosPage from "./components/CryptosPage";
import initialState from "./services/initialState";
import reducer from "./reducers/index";
import CalypsoContext from "./context";

// import { getRatesAndAccounts } from "./services/api";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(state);
    // return getRatesAndAccounts.fork(console.error, console.log);
  });

  return (
    <>
      <CalypsoContext.Provider value={{ state, dispatch }}>
        {state.loggedIn ? <CryptosPage /> : <LoginPage />}
      </CalypsoContext.Provider>
    </>
  );
}
