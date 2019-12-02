import "./styles/style.scss";

import React from "react";
import ReactDOM from "react-dom";
import Future from "fluture/index.js";
import PropTypes from "prop-types";

import { getImgName, getFullName } from "./scripts/helpers";
import RateItem from "./scripts/RateItem";
import getRate from "./scripts/rate-call";

import SELECTED from "./scripts/variables";

const WarningItem = props => {
  return <article className="rate__message">{props.value}</article>;
};

WarningItem.propTypes = {
  value: PropTypes.string
};

class AllTheRateItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = SELECTED.map(r => ({
      [r]: { status: "NotAsked", content: "Loading Cryptos" }
    })).reduce((acc, v) => Object.assign(acc, v), {});
  }

  componentDidMount() {
    const futureList = SELECTED.map(r => this.fetchData(r));

    Future.parallel(SELECTED.length, futureList).value(x => x);
  }

  // populate state with fetched data
  fetchData(rate) {
    this.setState({
      [rate]: { status: "Loading", content: "Loading Cryptos" }
    });

    return getRate(rate);
  }

  render() {
    const cryptos = Object.keys(this.state);
    const cryptoStatuses = cryptos.map(crypto => {
      return {
        base: crypto,
        value: this.state[crypto]
      };
    });

    return cryptoStatuses.map((item, index) => {
      switch (item.value.status) {
        case "NotAsked":
        case "Loading":
          if (index === 0) {
            return <WarningItem key={index} value={item.value.content} />;
          }
          break;
        case "Failure":
          return;
        case "Success":
          return (
            <RateItem key={index} base={item.base} value={item.value.content} />
          );
        default:
          if (index === 0) {
            return (
              <RateItem
                key={index}
                base={item.base}
                value={"Oops, that was unexpected..."}
              />
            );
          }
          break;
      }
    });
  }
}

const container = document.getElementById("rates");
ReactDOM.render(<AllTheRateItems />, container);
