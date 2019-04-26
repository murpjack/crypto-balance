
let selectedRates = [{
    id: "BAT",
    name: "Basic Attention Token"
  },
  {
    id: "BTC",
    name: "Bitcoin"
  },
  {
    id: "ETC",
    name: "Etherium Classic"
  },
  {
    id: "ETH",
    name: "Etherium"
  },
  {
    id: "LTC",
    name: "Litecoin"
  },
  {
    id: "XRP",
    name: "Ripple"
  }
];


function toLowerCase(abr) {
  switch (abr) {
    case "BTC":
      return "btc"
      break;
    case "BAT":
      return "bat"
      break;
    case "ETC":
      return "etc"
      break;
    case "ETH":
      return "eth"
      break;
    case "LTC":
      return "ltc"
      break;
    case "XRP":
      return "xrp"
      break;
    default:
      return "btc"
      break;
  }
}

function setCurrencySymbol(curr) {
  switch (curr) {
    case "BTC":
      return "Ƀ"
      break;
    case "EUR":
      return "€"
      break;
    case "GBP":
      return "£"
      break;
    case "USD":
      return "$"
      break;
    default:
      return "£"
      break;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  getRatesData();
});

const BASE_CURRENCY = "GBP";
function url(id) {
  return `https://api.coinbase.com/v2/prices/${id}-${BASE_CURRENCY}/spot`
};
// Improve naming conventions!!! *** To do ***
// loop through fetches
function getRatesData() {
  // loop through fetch synchronously,
  // on last fetch resolve promise && build HTML
  function fetchData(rate, index, array) {
    console.log(rate.id);
    fetch(url(rate.id))
      .then(response => {
        console.log(rate.id);
        return response.json();
      })
      .then(json => {
        // Add data to selectedRates obj
        console.log(21,rate);
        console.log("data to selectedRates", json.data);
        return returnRateData(json.data, rate, array);
      })
      .then(array => {
        console.log("array", array);
        return array;
        // returnRateData(json.data);
      })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    //   // addDataToSelectedRates(value, rate, index, array);
  }

  // forEach doesn't wait for fetch.thens so I am using async/await
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    } // END for loop
  } // END asyncForEach fn


  const start = async () => {
    await asyncForEach(selectedRates, async (rate, index, array) => {
      await fetchData(rate, index, array);
    });
    console.log("Callback", fetchData());
    // appendRatesListToBody(selectedRates);
  };
  start();
}

function returnRateAmount(data) {
  console.log(230);
  let currencySymbol = setCurrencySymbol(data.currency);
  // convert string into a number, then to 2dp
  let value = parseFloat(data.amount).toFixed(2);
  let valueString = currencySymbol + value;
  return {
    "currentValue": valueString
  };
}

function returnRateIcon(data) {
  console.log(231);
  return {
    "icon": `./node_modules/cryptocurrency-icons/32/color/${toLowerCase(data.id)}.png`
  };
}

function addValueToRate(namedValue, rate) {
  console.log(232);
  let newRate = {
    ...rate,
    ...namedValue
  };
}

function returnRateData(data, rate, array) {
  console.log(22, );
  addValueToRate(returnRateIcon(data), rate);
  addValueToRate(returnRateAmount(data), rate);
  return array;
}

function appendRatesListToBody(data) {
  console.log(4, data);
  let rates = document.getElementById("rates");
  rates.innerHTML = "";
  let ratesList = buildRatesList(data);
  ratesList.map(item => rates.appendChild(item));
}

function buildRatesList(data) {
  let ratesContent = [];

  function createArticle(rate, list) {
    console.log(33, rate);
    let article = document.createElement("article");
    let bat = "";
    article.setAttribute("id", rate.id);
    article.classList.add('rate');
    if (rate.id === "BAT") {
      bat = "name--bat";
    }
    article.innerHTML =
      `<img src="${rate.icon}" class="rate__image"/>
       <div class='rate__name name ${bat}'>
         <h1 class='name--full'><strong>${rate.name}</strong></h1>
         <h2 class='name--short'>${rate.id}</h2>
       </div>
       <span class='rate__value value'>${rate.currentValue}
       </span>`;
    return list.push(article);
  }
  data.map(rate => createArticle(rate, ratesContent));
  return ratesContent;
}



function refreshRates(e) {
  let target = e.target;
  let parent = target.parentElement;

  if (target.id === "refreshRates" ||
    parent.id === "refreshRates") {
    // Refresh those rates
    getRatesData();
    // });
    // add feedback once refreshed!! *** TODO ***
  }

  if (target.id === "refreshRates") {
    rotateRefreshBtn(target);
  } else if (parent.id === "refreshRates") {
    rotateRefreshBtn(parent);
  }

  function rotateRefreshBtn(el) {
    el.classList.add("refresh--rotate");
    setTimeout(function() {
      el.classList.remove("refresh--rotate");
    }, 400);
  }
} // END refreshRates fn


function updateExtensionIcon(e) {
  let pathTo = e.path;
  pathTo.forEach((el) => {

    if (el.tagName === "ARTICLE") {
      chrome.browserAction.setIcon({
        path: `./node_modules/cryptocurrency-icons/32/color/${toLowerCase(el.id)}.png`
      });
      chrome.browserAction.setBadgeText({
        text: "DWN"
      });
      chrome.browserAction.setBadgeBackgroundColor({
        color: "#ff3231"
      });
    }
  });
}

function updateBadge(change) {
  const green = "#0A950A";
  const red = "#ff3231";

  change ? priceUp() : priceDown();

  function priceUp(green) {
    setBadgeBGColor(green);
    setBadgeTxt("UP");
  }

  function priceDown(red) {
    setBadgeBGColor(red);
    setBadgeTxt("DWN");
  }

  function setBadgeTxt(txt) {
    if (isPriceChange) {
      chrome.browserAction.setBadgeText({
        text: txt
      });
    } else {
      chrome.browserAction.setBadgeText({
        text: ""
      });
    }
  }

  function setBadgeBGColor(col) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: col
    });
  }
}



// Click events
document.addEventListener("click", function(e) {

  refreshRates(e);
  updateExtensionIcon(e);

});
