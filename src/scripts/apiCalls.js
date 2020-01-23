import {
  CLIENT_ID,
  CLIENT_SECRET,
  SUCCESS_URI,
  AUTHORIZATION_CODE
} from "./variables";

const apiCalls = {
  // request access code
  requestAccess: {
    url: "https://www.coinbase.com/oauth/authorize",
    options: {
      method: "GET",
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: SUCCESS_URI
    }
  },
  // exchange code for access token
  exchangeCode: {
    url: code =>
      "https://api.coinbase.com/oauth/token" +
      `/?grant_type=${AUTHORIZATION_CODE}&code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${SUCCESS_URI}`,
    options: {
      method: "POST",
      headers: {
        "CB-Version": "2019-12-12"
      }
    }
  },
  // TODO: store headers as params in url
  fetchAccounts: {
    url: "https://api.coinbase.com/v2/accounts",
    options: accessToken => ({
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
  }
};

export const requestAccess = apiCalls.requestAccess;
export const exchangeCode = apiCalls.exchangeCode;
export const fetchAccounts = apiCalls.fetchAccounts;
