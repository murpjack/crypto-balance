import { useReducer } from "react";
import Future from "fluture/index.js";
import { reducer } from "./context";
import initialState from "./initialState";
import { SELECTED } from "./variables";
import accountData from "./getAccounts";
import getRate from "./getRate";

export default function getData() {
  return Future.of(ratesIntoStateObj())
    .map(accountsIntoStateObj)
    .map(dispatched)
    .value(console.log);

  function ratesIntoStateObj() {
    const rates = SELECTED.map(r => getRate(r));
    console.log(99, rates);

    const ratesArray = [
      { BTC: { status: "Success", content: "Text" } },
      { BTC: { status: "Success", content: "Text" } }
    ];
    return ratesArray;
  }

  function accountsIntoStateObj(ratesArray) {
    const filterAccounts = accountArray => filtering(accountArray, ratesArray);
    const accountArray = accountData(filterAccounts);

    return {
      isLoggedin: true,
      rateData: ratesArray,
      accountData: accountArray
    };
  }

  function filtering(accountArray, rateArray) {
    // check if accounts in user portfolio are not empty & are in our list,
    // otherwise don't show value in app
    return accountArray
      .filter(a => parseFloat(a.balance.amount) !== 0)
      .filter(a => SELECTED.map(c => a === c))
      .map((a, idx) => setAccount(a, rateArray[idx]));
  }

  function setAccount({ currency, balance }, unitValue) {
    const { amount } = balance;
    const { code, name } = currency;
    const value = parseFloat(amount) * unitValue;
    return {
      [code]: {
        status: "Success",
        content: {
          name: name,
          amount: amount,
          value: `£${value}`
        }
      }
    };
  }

  function dispatched(newState) {
    const [dispatch] = useReducer(reducer, initialState)[1];
    console.log(newState);
    return dispatch(newState);
  }
}
