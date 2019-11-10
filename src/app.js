import "./styles/style.scss";

import React from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";

import Future, { tryP, parallel } from "fluture/index.js";

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
    case "DAI":
      return "dai";
    case "BCH":
      return "bch";
    case "XLM":
      return "xlm";
    default:
      return "crypto";
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
    case "BCH":
      return "Bitcoin Cash";
    case "DAI":
      return "Dai";
    case "XLM":
      return "Stellar Lumens";
    default:
      return "Crypto";
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

const selectedRates = ["BTC", "BCH", "DAI", "ETC", "ETH", "LTC", "XRP", "XLM"];

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

const WarningItem = props => {
  return <article className="rate__message">{props.value}</article>;
};

RateItem.propTypes = {
  base: PropTypes.string,
  value: PropTypes.string
};

WarningItem.propTypes = {
  value: PropTypes.string
};

class AllTheRateItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = selectedRates
      .map(r => ({ [r]: { status: "NotAsked", content: "Loading Cryptos" } }))
      .reduce((acc, v) => Object.assign(acc, v), {});
  }

  componentDidMount() {
    const futureList = selectedRates.map(r => this.fetchData(r));

    parallel(selectedRates.length, futureList).value(x => x);
  }

  // populate state with fetched data
  fetchData(rate) {
    this.setState({
      [rate]: { status: "Loading", content: "Loading Cryptos" }
    });

    const createObjct = res => {
      if (res.errors) {
        return {
          [rate]: {
            status: "Failure",
            error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
          }
        };
      } else {
        return {
          [rate]: {
            status: "Success",
            content: rtnValueStr(res.data)
          }
        };
      }
    };

    const fetchF = Future.encaseP(fetch);

    const spotUrl = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;

    const responseJSON = fetchF(spotUrl).chain(res => tryP(_ => res.json()));

    const newObject = responseJSON.map(createObjct);

    const updateState = newObject.value(obj => this.setState(obj));

    return Future.of(updateState);
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
      console.log(item);
      switch (item.value.status) {
        case "NotAsked":
        case "Loading":
          if (index === 0) {
            return <WarningItem key={index} value={item.value.content} />;
          }
          break;
        case "Failure":
          if (index === 0) {
            return <WarningItem key={index} value={item.value.error} />;
          }
          break;
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
