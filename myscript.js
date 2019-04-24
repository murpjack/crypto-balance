const baseCurrency = "?currency=GBP";
const URL = "https://api.coinbase.com/v2/exchange-rates" + baseCurrency;
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

document.addEventListener("DOMContentLoaded", function() {
  getRatesData();

});
// Improve naming conventions!!! *** TODO ***
function getRatesData() {
  fetch(URL)
    .then(response => response.json())
    .then(json => addRatesDataToObject(json.data))
    .then(data => appendRatesListToBody(data));
}

function addImagesToObject() {
  selectedRates.map((rate, index) => {
    let icon = {
      "icon": `./node_modules/cryptocurrency-icons/32/color/${setImage(rate.id)}.png`
    };
    selectedRates[index] = { ...rate,
      ...icon
    };

  });

}

function setImage(abr) {
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

function addRatesDataToObject(data) {
  // loop through data.rates.keys and loop through selectedRates.id and
  // if data.rates[n].keys === selectedRates.id[i], selectedRates[i] + data.rates.value
  let currencySymbol = setCurrencySymbol(data.currency);
  let dataIds = Object.keys(data.rates);

  dataIds.forEach((id, idIndex) => {
    selectedRates.map((rate, index) => {
      let idInSelectedRates = (id === rate.id);
      if (idInSelectedRates) {
        let value = parseFloat(data.rates[id]);
        let valueString = value.toPrecision(4);

        let addedValue = {
          "value": valueString
        };
        selectedRates[index] = { ...rate,
          ...addedValue
        };

      }
    });
  });
  // put this in a better location!!!  *** TODO ***
  addImagesToObject();
  // console.log(1, selectedRates);
  return selectedRates;
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



function buildRatesList(data) {
  let ratesContent = [];

  function createArticle(rate, list) {
    let article = document.createElement("article");
    article.setAttribute("id", rate.id);
    article.classList.add('rate');
    if (rate.id === "BAT") {
      article.innerHTML =
        `<img src="${rate.icon}" class="rate__image"/>
    <div class='rate__name name name--bat'>
    <h1 class='name--full'><strong>${rate.name}</strong></h1>
    <h2 class='name--short'>${rate.id}</h2>
    </div>
    <div class='rate__value value value--up'>${rate.value}
    </span>`;
    } else {
      article.innerHTML =
        `<img src="${rate.icon}" class="rate__image"/>
  <div class='rate__name name'>
  <h1 class='name--full'><strong>${rate.name}</strong></h1>
  <h2 class='name--short'>${rate.id}</h2>
  </div>
  <span class='rate__value value value--up'>${rate.value}
  </span>`;
    }
    return list.push(article);
  }
  data.map(rate => createArticle(rate, ratesContent));
  return ratesContent;
}

function appendRatesListToBody(data) {
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

    if(el.tagName === "ARTICLE") {
      chrome.browserAction.setIcon({
        path: `./node_modules/cryptocurrency-icons/32/color/${setImage(el.id)}.png`
      });
    }
  });
}

function updateBadge(change) {
    change? priceUp() : priceDown();
  function setBadgeTxt(txt) {
    chrome.browserAction.setBadgeText({
      text: txt
    });
  }
  function setBadgeBGColor(col) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: col
    });
  }
  function priceUp() {
    const green = "#0A950A";
    setBadgeBGColor(green);
    setBadgeTxt("UP");
   }

  function priceDown() {
    const red = "#ff6565";
    setBadgeBGColor(red);
    setBadgeTxt("DWN");
  }

}



// Click events
document.addEventListener("click", function(e) {

  refreshRates(e);
  updateExtensionIcon(e);

});
