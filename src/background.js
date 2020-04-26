const TEMPORARY_CODE = "TEMPORARY_CODE";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const EXPIRES_IN = "EXPIRES_IN";

console.log("bg script");
// Just for test purposes
// let a = 0;
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.local.set({ [REFRESH_TOKEN]: a });
// });

chrome.storage.onChanged.addListener(changes => {
  if (changes[REFRESH_TOKEN]) {
    const timeLeft = changes[EXPIRES_IN] ? changes[EXPIRES_IN] : 5000;
    // const temporaryCode = changes[TEMPORARY_CODE];
    // const refreshToken = changes[REFRESH_TOKEN];
    setTimeout(() => {
      // Make call, set these values
      // a += 1;
      // chrome.storage.local.set({ [TEMPORARY_CODE]: a });
      // chrome.storage.local.set({ [REFRESH_TOKEN]: a });
      // chrome.storage.local.set({ [TEMPORARY_CODE]: temporaryCode });
      // chrome.storage.local.set({ [REFRESH_TOKEN]: refreshToken });
    }, timeLeft);
  }
});
