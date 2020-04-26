import Future from "fluture/index.js";

import selectedAssets from "../constants/selected";
import { rateUrl, accountUrl, tempCodeUrl } from "../constants/api";

import { getF, postF } from "../libs/requestsF";

import getDecimalValue from "../libs/getDecimalValue";
import { TEMPORARY_CODE, REFRESH_TOKEN, EXPIRES_IN } from "../constants/login";

export const getRate = rate => {
  const setRateObj = res => (res.errors ? left(res) : right(res));

  const right = ({ data }) => {
    const { amount } = data.data;
    return {
      status: "Success",
      code: rate,
      value: getDecimalValue(amount)
    };
  };

  const left = res => ({
    [rate]: {
      status: "Failure",
      error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
    }
  });

  return getF(rateUrl(rate)).map(setRateObj);
};

export const getTempCode = () =>
  Future((rej, res) => chrome.storage.local.get([TEMPORARY_CODE], res));

// storage API returns a string or an empty object, handle outcome
export const checkTempCode = data => {
  return Future((rej, res) => {
    if (typeof data === "string") {
      return res(data);
    }
    rej("Not logged in");
  });
};

function getAccessToken(data) {
  if (typeof data === "string") {
    const { url, options } = tempCodeUrl;
    const token = postF(url(data), options)
      .map(response => response.status === 200 && response.data)
      .map(data => {
        console.log("data", data);
        // chrome.storage.local.set({ [EXPIRES_IN]: expires_in });
        // chrome.storage.local.set({ [TEMPORARY_CODE]: temporaryCode });
        // chrome.storage.local.set({ [REFRESH_TOKEN]: refreshToken });
        return data;
      });
    return token;
  }
}

export const makeAccountRequest = data => {
  const { access_token } = data;
  const { url, options } = accountUrl;
  return getF(url, options(access_token));
};

const getSelectedAccounts = accounts => {
  const filtered = accounts.filter(account => {
    const { currency } = account;
    for (let i = 0; i < selectedAssets.length; i++) {
      const name = selectedAssets[i];
      if (name === currency.code) return account;
    }
  });

  return filtered;
};

const setAccountObj = account => {
  const { currency, balance } = account;

  const { amount } = balance;
  const { code, name } = currency;

  const value = getDecimalValue(parseFloat(amount));
  return {
    status: "Success",
    code: code,
    name: name,
    amount: amount,
    value: value
  };
};

function getAccount() {
  return getTempCode()
    .chain(checkTempCode)
    .chain(getAccessToken)
    .chain(makeAccountRequest)
    .map(({ data }) => getSelectedAccounts(data.data))
    .map(list => list.map(setAccountObj));
}

const addCurrentAccountValue = data => {
  const [accounts, rates] = data;
  const accountsValues = accounts.map(account => {
    const accName = account.code;
    rates.map(rate => {
      const rateName = rate.code;

      if (accName === rateName) {
        const a = account;
        const r = rate;
        a.value = getDecimalValue(a.amount * r.value);
      }
    });
    return account;
  });
  return [accountsValues, rates];
};

export function getAllRates() {
  const ratesList = selectedAssets.map(getRate);
  return Future.parallel(selectedAssets.length, ratesList);
}

export const getRatesAndAccounts = () =>
  Future.both(getAccount(), getAllRates()).map(addCurrentAccountValue);

export default {
  getTempCode,
  checkTempCode,
  makeAccountRequest,
  getRatesAndAccounts,
  getAllRates
};
