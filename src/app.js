import "./styles/style.scss";
import AllTheRateItems from "./components/content.js";

import React from "react";
import ReactDOM from "react-dom";

const RatesHook = document.getElementById("rates");
ReactDOM.render(<AllTheRateItems />, RatesHook);
