import Future from "fluture/index.js";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, SUCCESS_URI, REFRESH_TOKEN } from "./login";

const getF = (url, options) => Future.tryP(() => axios.get(url, options));
const postF = Future.encaseP(axios.post);
const baseUrl = "https://api.coinbase.com";

export const signinUrl =
  `https://www.coinbase.com/oauth/authorize?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(SUCCESS_URI)}` +
  "&response_type=code&scope=wallet%3Aaccounts%3Aread&account=all";

export function tempCodeForAccess(code) {
  const url =
    `${baseUrl}/oauth/token` +
    `?grant_type=authorization_code` +
    `&code=${code}` +
    `&client_id=${CLIENT_ID}` +
    `&client_secret=${CLIENT_SECRET}` +
    `&redirect_uri=${SUCCESS_URI}`;

  const options = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "CB-Version": "2019-12-12"
    }
  };

  return postF(url, options)
    .map(response => response.status === 200 && response.data)
    .map(storeTokens);
}

export function refreshForAccess(token) {
  const url =
    `${baseUrl}/oauth/token` +
    `?grant_type=refresh_token` +
    `&refresh_token=${token}` +
    `&client_id=${CLIENT_ID}` +
    `&client_secret=${CLIENT_SECRET}`;

  const options = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "CB-Version": "2019-12-12"
    }
  };
  return postF(url, options)
    .map(response => response.status === 200 && response.data)
    .map(storeTokens);
}

function storeTokens(data) {
  localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
  return data.access_token;
}

export function getAccountData(access_token) {
  const url = `${baseUrl}/v2/accounts/`;
  const options = {
    method: "GET",
    headers: {
      "CB-Version": "2019-12-12",
      Authorization: "Bearer " + access_token
    }
  };
  return getF(url, options);
}

export function getRateData() {
  // returns object of {code: exchange-rate}
  return getF(`${baseUrl}/v2/exchange-rates?currency=GBP`);
}

export default {
  signinUrl,
  tempCodeForAccess,
  refreshForAccess,
  getAccountData,
  getRateData
};
