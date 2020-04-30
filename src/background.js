// import Future from "fluture/index.js";
// import { postF } from "./libs/requestsF";
//
// import {
//   CLIENT_ID,
//   CLIENT_SECRET,
//   SUCCESS_URI,
//   TEMPORARY_CODE,
//   REFRESH_TOKEN
// } from "./constants/login";
//
// export function makeFirstCall(changes) {
//   const tempCodeUrl =
//     `https://api.coinbase.com/oauth/token` +
//     `?grant_type=authorization_code` +
//     `&code=${changes[TEMPORARY_CODE].newValue}` +
//     `&client_id=${CLIENT_ID}` +
//     `&client_secret=${CLIENT_SECRET}` +
//     `&redirect_uri=${SUCCESS_URI}`;
//
//   const options = {
//     method: "POST",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "CB-Version": "2019-12-12"
//     }
//   };
//
//   return postF(tempCodeUrl, options)
//     .map(response => response.status === 200 && response.data)
//     .map(storeTokens);
// }
//
// export function makeRefreshCall(changes) {
//   const refreshTokenUrl =
//     `https://api.coinbase.com/oauth/token` +
//     `?grant_type=refresh_token` +
//     `&refresh_token=${changes[REFRESH_TOKEN].newValue}` +
//     `&client_id=${CLIENT_ID}` +
//     `&client_secret=${CLIENT_SECRET}`;
//
//   const options = {
//     method: "POST",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "CB-Version": "2019-12-12"
//     }
//   };
//
//   postF(refreshTokenUrl, options)
//     .map(response => response.status === 200 && response.data)
//     .map(storeTokens);
// }
//
// function storeTokens(data) {
//   localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
//   return data;
// }
//
