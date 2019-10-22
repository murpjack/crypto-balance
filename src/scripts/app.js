import "./../styles/style.scss";

import React from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";

import { map, after, parallel } from "fluture/index.js";

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
    this.state = selectedRates
      .map(r => ({ [r]: { status: "NotAsked" } }))
      .reduce((acc, v) => Object.assign(acc, v), {});
  }

  componentDidMount() {
    selectedRates.map(rate => {
      // TODO: determine if error or success
      // TODO: handle outcome of fetch Call
      this.fetchData(rate);
    });
  }
  // TODO: return a future from fetchData
  // populate state with fetched data
  fetchData(rate) {
    const spotUrl = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;
    this.setState({ [rate]: { status: "Loading" } });

    // const arr = Array.from(Array(10).keys())
    //   .map(after(20))
    //   .map(arr => arr.map(v => `Number ${v}`));
    // const newArr = parallel(5, arr).fork(console.error, console.log);
    // console.log(arr);

    // Make fetch requests
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
          return "Oops, that was unexpected...";
      }
    });
  }
}

const RatesHook = document.getElementById("rates");
ReactDOM.render(<AllTheRateItems />, RatesHook);
