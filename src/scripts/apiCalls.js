import {
  CLIENT_ID,
  CLIENT_SECRET,
  SIGNIN_REDIRECT_URI,
  SUCCESS_REDIRECT_URI
} from "./scripts/variables";

const apiCalls = {
  // request access code
  requestAccess: {
    url: "https://www.coinbase.com/oauth/authorize",
    options: {
      method: "GET",
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: SIGNIN_REDIRECT_URI
    }
  },
  // exchange code for access token
  exchangeCode: {
    url: "https://api.coinbase.com/oauth/token",
    options: code => ({
      grant_type: "authorization_code",
      method: "POST",
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: SUCCESS_REDIRECT_URI
    })
  },
  getAccounts: {
    url: asset => `https://api.coinbase.com/v2/accounts${asset}`,
    options: token => ({
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
};

const requestAccess = apiCalls.requestAccess;
const exchangeCode = apiCalls.exchangeCode;
const getAccounts = apiCalls.getAccounts;

export default { getAccounts, requestAccess, exchangeCode };
