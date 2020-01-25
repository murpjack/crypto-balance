import Future from "fluture/index.js";
import { fetchF, responseJSON } from "./futureFetch";
import selectedAssets from "../constants/selectedAssets";
import { rateUrl, accountsUrl } from "../constants/api";
import getDecimalValue from "./getDecimalValue";

export const getRate = rate => {
  const setRateObj = res => (res.errors ? left(res) : right(res));

  const right = ({ data }) => {
    const { amount } = data;
    return {
      [rate]: {
        status: "Success",
        content: { value: getDecimalValue(amount) }
      }
    };
  };

  const left = res => ({
    [rate]: {
      status: "Failure",
      error: `Oh no Jimmy, that looks like a [resource ${res.errors[0].id}]!`
    }
  });

  const url = rateUrl(rate);

  return fetchF(url)
    .chain(responseJSON)
    .map(setRateObj);
};

export const getAccounts = () =>
  fetchF(accountsUrl)
    .chain(responseJSON)
    .map(({ data }) => data)
    .map(a => {
      console.log(1, a);
      return getSelectedAccounts(a);
    })
    .map(setAccountObj);

const setAccountObj = ({ currency, balance }) => {
  const { amount } = balance;
  const { code, name } = currency;
  const value = getDecimalValue(parseFloat(amount));
  return {
    [code]: {
      status: "Success",
      content: {
        name: name,
        amount: amount,
        value: value
      }
    }
  };
};
const getSelectedAccounts = accounts => {
  console.log(accounts);
  accounts.filter(account => {
    selectedAssets.map(name => {
      console.log(name, accounts.code);
      if (name === account.code) return account;
    });
  });
};

function getAllRates() {
  const ratesList = selectedAssets.map(getRate);
  return Future.parallel(selectedAssets.length, ratesList);
}

export const getRatesAndAccounts = Future.both(
  getAllRates(),
  getAccounts()
).map(a => {
  console.log(23, a);
  return a;
});

export default { getRatesAndAccounts };
