// import * as data from "./data.js"
import "./../css/style.css"
import "./../scss/style.scss"

import React from 'react';
import ReactDOM from 'react-dom';

// import {rateItem} from "./components.jsx"
// console.log(rateItem);

let selectedRates = [
  "BTC",
  "ETC",
  "ETH",
  "LTC",
  "XRP"
];


function returnImgName(abr) {
  switch (abr) {
    case "BTC":
      return "btc"
      break;
    case "ETC":
      return "etc"
      break;
    case "ETH":
      return "eth"
      break;
    case "LTC":
      return "ltc"
      break;
    case "XRP":
      return "xrp"
      break;
    default:
      return "btc"
      break;
  }
}

function returnFullName(abr) {
  switch (abr) {
    case "BTC":
      return "Bitcoin"
      break;
    case "ETC":
      return "Etherium Classic"
      break;
    case "ETH":
      return "Etherium"
      break;
    case "LTC":
      return "Litecoin"
      break;
    case "XRP":
      return "Ripple"
      break;
    default:
      return "Bitcoin"
      break;
  }
}

function returnCurrencySymbol(curr) {
  switch (curr) {
    case "BTC":
      return "Ƀ"
      break;
    case "EUR":
      return "€"
      break;
    case "GBP":
      return "£"
      break;
    case "USD":
      return "$"
      break;
    default:
      return "£"
      break;
  }
}

function rtnValueStr(data) {
  let currencySym = returnCurrencySymbol(data.currency);
  let roundUpValue = parseFloat(data.amount).toFixed(2);
  return currencySym + roundUpValue;
}

class RateItem extends React.Component {

    constructor(props) {
      super(props);
      this.state = { base: "ETC", valueStr: "$227.93" };
    }

    componentDidMount() {
      this.fetchData(selectedRates[2]);
    }

    fetchData(rate) {
      let spotUrl = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;
      return fetch(spotUrl)
        .then(response => response.json())
        .then(json => {
          this.setState({ base: json.data.base, valueStr: rtnValueStr(json.data) })
        })
        // .then(json => console.log(this, json))
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });
        }

      render() {
        return (
          <article id={ this.state.base } className="rate">
            <img src={ "./images/32/color/" + returnImgName(this.state.base) + ".png" } className="rate__image" />
            <div className="rate__name name">
              <h1 className="name--full"> <strong> {returnFullName(this.state.base)} </strong> </h1>
              <h2 className="name--short"> { this.state.base } </h2>
            </div>
            <span className="rate__value value"> { this.state.valueStr } </span>
        </article>
        );
      }
    }

    const RatesHook = document.getElementById('rates');
    ReactDOM.render( <RateItem/> , RatesHook );
