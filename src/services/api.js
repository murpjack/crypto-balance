import Future from "fluture/index.js";

import selectedAssets from "../constants/selected";
import { getAccountData, getRateData } from "../constants/api";
import { ACCOUNT_CODES } from "../constants/login";

export function getAllRates() {
  const left = res => ({
    status: "Failure",
    error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
  });

  const right = res => {
    // rates = object
    const rates = res.data.data.rates;
    // so we map through an array of rate[keys] --> setRateData
    const ratesArray = selectedAssets.map(code => {
      // The value returned is asset value per 1GBP, so we divide 1 by value to get to invert value
      const value = 1 / parseFloat(rates[code]);
      return {
        status: "Success",
        code,
        imageName: code.toLowerCase(),
        value: getDecimalValue(value)
      };
    });
    return {
      status: "Success",
      rates: ratesArray
    };
  };

  return getRateData().map(res => (res.errors ? left(res) : right(res)));
}

export function getAccount(access_token, rates) {
  return getAccountData(access_token)
  .map(e => {console.log("accounts", e); return e})
  .map(getSelectedAssets)
    .map(assets => setAccountData(assets, rates))
    .map(assets => [...assets].sort(alphabetiseAssets));
}

function getSelectedAssets(assets) {
  const accountData = assets.data.data;
  console.log(1, selectedAssets)

  const filtered = accountData.filter(account => {
    console.log(1, account)
    for (let i = 0; i < selectedAssets.length; i++) {
      const name = selectedAssets[i];
    console.log(2, name,  account.currency)
      
      const balance = account.balance.amount;
      // Check that currency is in use
      console.log("B",balance, parseFloat(balance))
      if (name === account.currency && parseFloat(balance) != 0) {
       console.log("filtered", account)
        return account;
      }
    }
  });
  // This is an array of cryptos which exist in account with no additional data.
  // It is used to reduce jumpiness when logged in but call has not loaded account rates yet
  const cryptoArray = filtered.map(account => account.currency);
  localStorage.setItem(ACCOUNT_CODES, JSON.stringify(cryptoArray));
  return filtered;
}

function setAccountData(accountData, rates) {
  const data = accountData.map(account => {
    const { currency, balance } = account;
    const { amount } = balance;
    const imageName = currency.toLowerCase();
    const r = rates.filter(rate => currency === rate.code)[0];
    const value = getDecimalValue(amount * r.value);
    const asset = {
      status: "Success",
      code: currency,
      imageName,
      amount,
      value
    };
    return asset;
  });
  return data;
}

function alphabetiseAssets(a, b) {
  // Use toUpperCase() to ignore character casing
  const assetA = a.code.toUpperCase();
  const assetB = b.code.toUpperCase();

  let comparison = 0;
  if (assetA > assetB) {
    comparison = 1;
  } else if (assetA < assetB) {
    comparison = -1;
  }
  return comparison;
}

function getDecimalValue(amount) {
  const roundUpValue = parseFloat(amount).toFixed(2);
  return roundUpValue;
}

export default { getAllRates, getAccount };
