import "./style.scss";

import React from "react";
import { Provider } from "./store";

import Calypso from "./components/Calypso";

export const App = () => (
  <Provider>
    <Calypso />
  </Provider>
);
export default App;
