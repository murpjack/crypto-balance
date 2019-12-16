import "./styles/style.scss";

import React from "react";
import ReactDOM from "react-dom";
import {StaticRouter, Route, Switch } from "react-router-dom";

// TODO: structure: -App, -Login | -Cryptos
class Calypso extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StaticRouter>
      <Switch>
      // Login Page
      <Route path="/login">
      // Cryptos page
      <Route path="/cryptos">
      </Switch>
      </StaticRouter>
    )
  }
}

const container = document.getElementById("app");
// ReactDOM.render(<AllTheRateItems />, container);
ReactDOM.render(<Calypso />, container);
