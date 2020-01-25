import {
  CLIENT_ID,
  CLIENT_SECRET,
  SUCCESS_URI,
  AUTHORIZATION_CODE
} from "./login";

// request access code
export const requestAccessUrl = {
  url: "https://www.coinbase.com/oauth/authorize",
  options: {
    method: "GET",
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: SUCCESS_URI
  }
};

const baseUrl = `https://api.coinbase.com/v2`;
// exchange code for access token
export const exchangeCodeUrl = {
  url: code =>
    `${baseUrl}/oauth/token` +
    `/?grant_type=${AUTHORIZATION_CODE}&code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${SUCCESS_URI}`,
  options: {
    method: "POST",
    headers: {
      "CB-Version": "2019-12-12"
    }
  }
};

// TODO: store headers as params in url
export const accountsUrl = {
  url: `${baseUrl}/accounts`,
  options: accessToken => ({
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
};

export const rateUrl = rate => `${baseUrl}/prices/${rate}-GBP/spot`;

export default { rateUrl, accountsUrl, exchangeCodeUrl, requestAccessUrl };
