import {
  CLIENT_ID,
  CLIENT_SECRET,
  SUCCESS_URI,
  AUTHORIZATION_CODE
} from "./login";

const baseUrl = "https://api.coinbase.com";
export const tempCodeUrl = {
  url: code =>
    `${baseUrl}/oauth/token` +
    `?grant_type=${AUTHORIZATION_CODE}` +
    `&code=${code}` +
    `&client_id=${CLIENT_ID}` +
    `&client_secret=${CLIENT_SECRET}` +
    `&redirect_uri=${SUCCESS_URI}`,
  options: {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "CB-Version": "2019-12-12"
    }
  }
};

export const accountUrl = {
  url: `${baseUrl}/v2/accounts/`,
  options: token => ({
    headers: {
      method: "GET",
      Authorization: "Bearer " + token
    }
  })
};

export const rateUrl = rate => `${baseUrl}/v2/prices/${rate}-GBP/spot`;

export default { tempCodeUrl, accountUrl, rateUrl };
