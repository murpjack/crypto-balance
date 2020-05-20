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
      const value = parseFloat(1 / rates[code]);
      return {
        status: "Success",
        code,
        imageName: code.toLowerCase(),
        value: parseFloat(value).toFixed(2)
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
    .map(getSelectedAssets)
    .map(assets => setAccountData(assets, rates));
}

function getSelectedAssets(assets) {
  const accountData = assets.data.data;

  const filtered = accountData.filter(account => {
    for (let i = 0; i < selectedAssets.length; i++) {
      const name = selectedAssets[i];

      const balance = account.balance.amount;
      // Check that currency is in use
      if (name === account.balance.currency && parseFloat(balance) != 0) {
        return account;
      }
    }
  });
  const alphabetised = [...filtered].sort(alphabetiseAssets);
  // This is an array of cryptos which exist in account with no additional data.
  // It is used to reduce jumpiness when logged in but call has not loaded account rates yet
  const cryptoArray = alphabetised.map(account => account.balance.currency);
  localStorage.setItem(ACCOUNT_CODES, JSON.stringify(cryptoArray));

  return alphabetised;
}

function setAccountData(accountData, rates) {
  const data = accountData.map(account => {
    const { balance } = account;
    const { amount } = balance;
    const imageName = balance.currency.toLowerCase();
    const r = rates.filter(rate => balance.currency === rate.code)[0];
    const value = parseFloat(amount * r.value).toFixed(2);
    const asset = {
      status: "Success",
      code: balance.currency,
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
  const assetA = a.balance.currency;
  const assetB = b.balance.currency;

  let comparison = 0;
  if (assetA > assetB) {
    comparison = 1;
  } else if (assetA < assetB) {
    comparison = -1;
  }
  return comparison;
}

export default { getAllRates, getAccount };
