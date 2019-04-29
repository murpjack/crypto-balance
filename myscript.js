let selectedRates = [
  "BAT",
  "BTC",
  "ETC",
  "ETH",
  "LTC",
  "XRP"
];


function returnImgName(abr) {
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

function returnFullName(abr) {
  switch (abr) {
    case "BTC":
      return "Bitcoin"
      break;
    case "BAT":
      return "Basic Attention Token"
      break;
    case "ETC":
      return "Etherium Classic"
      break;
    case "ETH":
      return "Etherium"
      break;
    case "LTC":
      return "Litecoin"
      break;
    case "XRP":
      return "Ripple"
      break;
    default:
      return "Bitcoin"
      break;
  }
}

function returnCurrencySymbol(curr) {
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
  getRatesData()
});

function getRatesData() {
  selectedRates.map((rate) => {
    fetchData(rate);
    console.log(fetchData(rate));
    // Promise.all([])
  });
}

function fetchData(rate) {
  let spotUrl = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;
  return fetch(spotUrl)
    .then(response => response.json())
    .then(json => (json) => createArticle(json.data))
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function createArticle(data) {
  let base = data.base;
  let article = document.createElement("article");
  article.setAttribute("id", base);
  article.classList.add('rate');

  let currencySymbol = returnCurrencySymbol(data.currency);
  let roundUpValue = parseFloat(data.amount).toFixed(2);
  let valueString = currencySymbol + roundUpValue;

  let bat = "";
  base === "BAT" ? bat = "name--bat" : bat = "";
  article.innerHTML =
    `<img src="./node_modules/cryptocurrency-icons/32/color/${returnImgName(base)}.png" class="rate__image"/>
     <div class='rate__name name ${bat}'>
       <h1 class='name--full'><strong>${returnFullName(base)}</strong></h1>
       <h2 class='name--short'>${base}</h2>
     </div>
     <span class='rate__value value'>${valueString}
     </span>`;
  return article;
}

function buildRatesList(data) {
  let ratesContent = [];
  data.map(rate => createArticle(rate, ratesContent));
  return ratesContent;
}

function appendRatesListToBody(data) {
  console.log(4, data);
  let rates = document.getElementById("rates");
  rates.innerHTML = "";
  let ratesList = buildRatesList(data);
  ratesList.map(item => rates.appendChild(item));
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
