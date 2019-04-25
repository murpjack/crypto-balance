const BASE_CURRENCY = "GBP";
const URL = "https://api.coinbase.com/v2/exchange-rates?currency=" + BASE_CURRENCY;

function ratePriceURL(id) {
  return `https://api.coinbase.com/v2/prices/${id}-${BASE_CURRENCY}/spot`
};
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

document.addEventListener("DOMContentLoaded", () => {
  getRatesData();
});

// Improve naming conventions!!! *** TODO ***
function getRatesData() {

  // loop through fetches
  // MUST wait for current fetch to finish before starting next one

  // watch for last fetch

  // on last fetch resolve to promise & build HTML

  let promise = new Promise((resolve) => {

    function fetchData(rate, index, array) {
      fetch(ratePriceURL("BTC"))
        .then(response => {
          // console.log(1, index, rate.id);
          return response.json()
        })
        .then(json => returnRateData(json.data))
        .then(value => {
          if (index === array.length - 1) {
            resolve(addDataToSelectedRates(value, rate, index));
          } else {
            addDataToSelectedRates(value, rate, index);
          }
        });

    }
    // Conventional for loop doesn't wait for fetch .thens to finish before
    // jumping on to the next item so async/await are used
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        console.log(1, array[index].id, index);
        await callback(array[index], index, array);
      } // END for loop
    } // END asyncForEach fn

    const start = async () => {
      await asyncForEach(selectedRates, async (rate, index, array) => {
        // loop through rates in array, wait for fn below before carrying on
        await fetchData(rate, index, array);
        console.log(2, rate.id, index);
      });
      console.log("selectedRates");
    };
    start();

  }).then(result => {
    console.log(result);
    appendRatesListToBody(result);
  });
}

function addDataToSelectedRates(value, rate, index) {
  let icon = returnRateIcon(rate);
  let promise = new Promise((resolve) => {
      resolve(selectedRates[index] = {
        ...rate,
        ...value,
        ...icon
      })
    })
    .then(result => function(result) {
      console.log(result);
    });
  return selectedRates;
}


function returnRateData(data) {
  let currencySymbol = setCurrencySymbol(data.currency);
  // convert string into a number, then to 2dp
  let value = parseFloat(data.amount).toFixed(2);
  let valueString = currencySymbol + value;
  let currentValue = {
    "currentValue": valueString
  };
  // console.log(data);
  return currentValue;
}

function returnRateIcon(rate) {
  return {
    "icon": `./node_modules/cryptocurrency-icons/32/color/${toLowerCase(rate.id)}.png`
  };
}

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

function appendRatesListToBody(data) {
  // console.log(data);
  let rates = document.getElementById("rates");
  rates.innerHTML = "";
  let ratesList = buildRatesList(data);
  // console.log(ratesList);
  ratesList.map(item => rates.appendChild(item));
}

function buildRatesList(data) {
  let ratesContent = [];

  function createArticle(rate, list) {
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
