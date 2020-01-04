import "./styles/style.scss";

import React from "react";
import ReactDOM from "react-dom";
import Future from "fluture/index.js";
import PropTypes from "prop-types";

import RateItem from "./scripts/RateItem";
import getRate from "./scripts/rate-call";

import { SELECTED, CLIENT_ID, SIGNIN_REDIRECT_URI } from "./scripts/variables";
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
    console.log(this.state);
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

const NewApp = () => {
  return (
    <div>
      <div className="login">
        <p className="login__text">
          Sign in with Coinbase to check your crypto assets.
        </p>
        <SigninButton />
      </div>

      <div className="rates container">
        <h2 className="container__title"></h2>
      </div>

      <div className="accounts container">
        <h2 className="container__title"></h2>
      </div>
    </div>
  );
};

function SigninButton() {
  const url =
    "https://www.coinbase.com/oauth/authorize?client_id=" +
    CLIENT_ID +
    "&redirect_uri=" +
    encodeURIComponent(SIGNIN_REDIRECT_URI) +
    "&response_type=code&scope=wallet%3Aaccounts%3Aread&account=all";
  return (
    <button className="login__button" href={url}>
      Sign in
    </button>
  );
}

const container = document.getElementById("app");
// ReactDOM.render(<AllTheRateItems />, container);
ReactDOM.render(<NewApp />, container);

function codeFromParams(query) {
  if (!query) return false;

  const q = query.split("#")[0];
  const arr = q.split("&");

  let code = null;
  arr.map(a => {
    const param = a.split("=");
    if (param[0] === "code") {
      code = param[1];
      return code;
    }
  });
  return code;
}

const encodeTempCode = code => encodeURIComponent(code);

// const codeToStorage = code => localStorage.setItem(TEMPORARY_CODE, code);

function getAccountsList() {
  // const codeInStorage = localStorage.getItem(TEMPORARY_CODE) !== null;
  // if (codeInStorage) {
  // const getTemporaryCode = localStorage.getItem(TEMPORARY_CODE);
  const setParamsInURL = code => exchangeCode.url(code);
  // const fetch = fetchF(Future);
  // console.log(fetch);
  const fetchF = Future.encaseP(fetch);
  // const responseJSON = res => Future.tryP(_ => res.json());
  const getAccessToken = url => {
    fetchF(url, exchangeCode.options)
      // .map(r => r.json())
      .map(r => {
        console.log(2, r, r.json);
        return r;
      })
      .value(r => r);
  };

  // const accountUrl = currency => getAccounts.url(currency);
  // const accountOptions = token => getAccounts.options(token);
  // const getAccountData = fetch(
  //   accountUrl("GBP"),
  //   accountOptions(getAccessToken)
  // );

  const data = Future.of(getTemporaryCode)
    .map(setParamsInURL)
    .map(getAccessToken)
    // .chain(responseJSON)
    // .map(getAccountData)
    // .chain(responseJSON)
    .value(result => result);

  return data;
  // }
}

chrome.tabs.query({}, tabs => {
  Future.of(getFirstTabWithParams(tabs))
    .map(getParameters)
    .map(codeFromParams)
    .map(encodeTempCode)
    .map(codeToStorage)
    .chain(getAccountsList)
    .value(result => result);
});

// const rateData = setData(SELECTED);
// const accountData = setData(SELECTED);

// function setData(cryptoList) {
//   return cryptoList
//     .map(r => ({
//       [r]: { status: "NotAsked", content: "Loading Cryptos" }
//     }))
//     .reduce((acc, v) => Object.assign(acc, v), {});
// }

// const initialState = {
//   isLoggedin: false,
//   rateData: rateData,
//   accountData: accountData
// };

// const store = createStore(console.log("fun"), initialState);
