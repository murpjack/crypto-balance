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
  let currencySym = returnCurrencySymbol(data.currency);
  let roundUpValue = parseFloat(data.amount).toFixed(2);
  return currencySym + roundUpValue;
}

let selectedRates = ["BTC", "ETC", "ETH", "LTC", "XRP"];

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

class AllTheRateItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    selectedRates.map(rate => {
      this.fetchData(rate);
    });
  }

  fetchData(rate) {
    let spotUrl = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;
    return fetch(spotUrl)
      .then(response => response.json())
      .then(json => {
        this.setState({ [json.data.base]: rtnValueStr(json.data) });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    let keys = Object.keys(this.state);
    let values = keys.map(key => {
      return { base: key, value: this.state[key] };
    });
    console.log(values);
    return (
      <div>
        {values.map((item, index) => {
          return <RateItem key={index} base={item.base} value={item.value} />;
        })}
      </div>
    );
  }
}

const RatesHook = document.getElementById("rates");
ReactDOM.render(<AllTheRateItems />, RatesHook);
