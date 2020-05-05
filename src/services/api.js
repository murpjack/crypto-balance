import Future from "fluture/index.js";

import selectedAssets from "../constants/selected";
import { getAccountData, getRateData } from "../constants/api";
import getImageName from "../libs/getImageName";
import getFullName from "../libs/getFullName";

export const getRate = rate => {
  const setRateObj = res => (res.errors ? left(res) : right(res));

  const right = ({ data }) => {
    const { amount } = data.data;
    return {
      status: "Success",
      code: rate,
      name: getFullName(rate),
      imageName: getImageName(rate),
      value: getDecimalValue(amount)
    };
  };

  const left = res => ({
    [rate]: {
      status: "Failure",
      error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
    }
  });

  return getRateData(rate).map(setRateObj);
};

export function getAllRates() {
  const ratesList = selectedAssets.map(getRate);
  return Future.parallel(selectedAssets.length, ratesList);
}

export function getAccount(access_token, rates) {
  return getAccountData(access_token)
    .map(getSelectedAssets)
    .map(assets => setAccountData(assets, rates))
    .map(assets => [...assets].sort(alphabetiseAssets));
}

function getSelectedAssets(assets) {
  const accountData = assets.data.data;
  const filtered = accountData.filter(account => {
    for (let i = 0; i < selectedAssets.length; i++) {
      const name = selectedAssets[i];
      if (name === account.currency.code) return account;
    }
  });
  return filtered;
}

function setAccountData(accountData, rates) {
  return accountData.map(account => {
    const { currency, balance } = account;
    const { amount } = balance;
    const { code, name } = currency;
    const imageName = getImageName(code);
    const r = rates.filter(rate => code === rate.code)[0];
    const value = getDecimalValue(amount * r.value);
    const asset = {
      status: "Success",
      code,
      name,
      imageName,
      amount,
      value
    };
    return asset;
  });
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
