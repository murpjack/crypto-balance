
function login() {
   return getAuthCode()
        .map(getTempCode)
        .map(exchangeTempCode)
}

function getAuthCode() {
   return getTabs()
        .map(getSelectedTab)
        .map(returnAuthCode)
}

function getTempCode() {
    const url = code =>
        `${baseUrl}/oauth/token` +
        `?grant_type=${AUTHORIZATION_CODE}` +
        `&code=${code}&client_id=${CLIENT_ID}` +
        `&client_secret=${CLIENT_SECRET}` +
        `&redirect_uri=${SUCCESS_URI}`;

    const options = {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "CB-Version": "2019-12-12"
        }
    };

    return getF(url, options)
}

function exchangeTempCode() {
    const url = `${baseUrl}/v2/accounts/`;
    const options = token => ({
        headers: {
            method: "GET",
            Authorization: "Bearer " + token
        }
    });

    return getF(url, options)
}

function refreshTempCode() {
    const url = `${baseUrl}/v2/accounts/`;
    const options = token => ({
        headers: {
            method: "GET",
            Authorization: "Bearer " + token
        }
    });

    getF(url, options)
}


function getAssets() {
    getAllRates();
    getAccountRates();
}


function getAccountRates() {
    const url = `${baseUrl}/v2/accounts/`;
    const options = token => ({
        headers: {
            method: "GET",
            Authorization: "Bearer " + token
        }
    });

    getF(url, options);

}

const getAllRates = () => rates.map(getRate);

const getRate = rate => getF(`${baseUrl}/v2/prices/${rate}-GBP/spot`);
