import Future from "fluture/index.js";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, SUCCESS_URI, REFRESH_TOKEN } from "./login";

const getF = Future.encaseP(axios.get);
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

  console.log("code ", code);
  return postF(url, options)
    .map(response => response.status === 200 && response.data)
    .map(storeTokens);
}

export function refreshForAccess(token) {
  console.log("rT", token);
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
  console.log("url", url);
  console.log("options", options);

  return postF(url, options)
    .map(e => {
      console.log("not stored", e);
      return e;
    })
    .map(response => response.status === 200 && response.data)
    .map(storeTokens);
}

function storeTokens(data) {
  localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
  console.log("token data: ", data);
  return data.access_token;
}

const getO = (url, options) => Future.tryP(() => axios.get(url, options));
export function getAccountData(access_token) {
  const url = `${baseUrl}/v2/accounts/`;
  const options = {
    headers: {
      method: "GET",
      Authorization: "Bearer " + access_token
    }
  };
  console.log("options ", options);
  return getO(url, options);
}

export function getRateData(rate) {
  return getO(`${baseUrl}/v2/prices/${rate}-GBP/spot`);
}

export default {
  tempCodeForAccess,
  refreshForAccess,
  getAccountData,
  getRateData
};
