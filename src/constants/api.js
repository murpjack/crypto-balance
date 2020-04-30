import Future from "fluture/index.js";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, SUCCESS_URI, REFRESH_TOKEN } from "./login";

const getF = (url, options) => Future.tryP(() => axios.get(url, options));
const postF = Future.encaseP(axios.post);
const baseUrl = "https://api.coinbase.com";

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
    headers: {
      method: "GET",
      Authorization: "Bearer " + access_token
    }
  };
  return getF(url, options);
}

export function getRateData(rate) {
  return getF(`${baseUrl}/v2/prices/${rate}-GBP/spot`);
}

export default {
  tempCodeForAccess,
  refreshForAccess,
  getAccountData,
  getRateData
};
