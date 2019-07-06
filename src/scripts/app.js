// import * as data from "./data.js"
import "./../css/style.css";
import "./../scss/style.scss";

import React from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";

function returnImgName(abr) {
  switch (abr) {
    case "BTC":
      return "btc";
    case "ETC":
      return "etc";
    case "ETH":
      return "eth";
    case "LTC":
      return "ltc";
    case "XRP":
      return "xrp";
    default:
      return "btc";
  }
}

function returnFullName(abr) {
  switch (abr) {
    case "BTC":
      return "Bitcoin";
    case "ETC":
      return "Etherium Classic";
    case "ETH":
      return "Etherium";
    case "LTC":
      return "Litecoin";
    case "XRP":
      return "Ripple";
    default:
      return "Bitcoin";
  }
}

function returnCurrencySymbol(curr) {
  switch (curr) {
    case "BTC":
      return "Ƀ";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "USD":
      return "$";
    default:
      return "£";
  }
}

function rtnValueStr(data) {
  const currencySym = returnCurrencySymbol(data.currency);
  const roundUpValue = parseFloat(data.amount).toFixed(2);
  return currencySym + roundUpValue;
}

const selectedRates = ["BTC", "ETC", "ETH", "LTC", "XRP"];

const RateItem = props => {
  // console.log(props);
  return (
    <article id={props.base} className="rate">
      <img
        src={"./images/32/color/" + returnImgName(props.base) + ".png"}
        className="rate__image"
      />
      <div className="rate__name name">
        <h1 className="name--full">
          {" "}
          <strong> {returnFullName(props.base)} </strong>{" "}
        </h1>
        <h2 className="name--short"> {props.base} </h2>
      </div>
      <span className="rate__value value"> {props.value} </span>
    </article>
  );
};

RateItem.propTypes = {
  base: PropTypes.string,
  value: PropTypes.string
};

// Our state property can be in one of these states depending on our fetch request
// success
//   state = {
//     status: "Success",
//     content: {}
//   };
//   // not asked
//   state = {
//     status: "NotAsked"
//   };
//   // loading
//   state = {
//     status: "Loading"
//   };
//   // Failure
//   state = {
//     status: "Failure",
//     error: ...
//   };
// }
class AllTheRateItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = selectedRates
      .map(r => ({ [r]: { status: "NotAsked" } }))
      .reduce((acc, v) => Object.assign(acc, v), {});

    selectedRates.map(rate => {
      this.fetchData(rate);
    });
  }

  fetchData(rate) {
    const spotUrl = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;
    this.setState({ [rate]: { status: "Loading" } });

    return fetch(spotUrl)
      .then(response => response.json())
      .then(json => {
        this.setState({
          [rate]: {
            status: "Success",
            content: rtnValueStr(json.data)
          }
        });
      })
      .catch(err => {
        this.setState({
          [rate]: {
            status: "Failure",
            error: `Oh no Jimmy, that's a nasty ${err} you've got there.`
          }
        });
      });
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
          return "Loading";
        case "Failure":
          return item.value.error;
        case "Success":
          return (
            <RateItem key={index} base={item.base} value={item.value.content} />
          );
        default:
          return "Oops, unexpected...";
      }
    });
  }
}

const RatesHook = document.getElementById("rates");
ReactDOM.render(<AllTheRateItems />, RatesHook);
