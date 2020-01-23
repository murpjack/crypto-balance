import Future from "fluture/index.js";
import { SELECTED } from "./variables";
import accountData from "./getAccounts";
import getRates from "./getRates";
import { getValue } from "./helpers";

export default function getRatesAndAccountsData() {
  return getRates().chain(addAccountsToObject);
}

function addAccountsToObject(rates) {
  return accountData()
    .map(accounts => filterAccounts(accounts, rates))
    .map(accounts => ({
      isLoggedin: true,
      currency: "GBP",
      rateData: rates,
      accountData: accounts
    }));
}

function filterAccounts(accountArray, rateArray) {
  // check if accounts in user portfolio are not empty & are in our list,
  // otherwise don't show value in app
  return accountArray
    .filter(a => parseFloat(a.balance.amount) !== 0)
    .filter(a => {
      return SELECTED.map(c => a.currency.code === c);
    })
    .map(a => {
      // TODO: separate this code into clearly named fns, purely for readability
      const filteredRates = rateArray
        .filter(rate => rate[a.currency.code])
        .map(rate => {
          const value = rate[a.currency.code].content.value;
          return setAccountData(a, value);
        });
      const accountObj = filteredRates[0];
      return accountObj;
    });
}

function setAccountData({ currency, balance }, unitValue) {
  const { amount } = balance;
  const { code, name } = currency;
  const value = parseFloat(amount) * unitValue;
  return {
    [code]: {
      status: "Success",
      content: {
        name: name,
        amount: amount,
        value: getValue(value)
      }
    }
  };
}
// TODO: add a logout button in logged in page
