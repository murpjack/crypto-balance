const selectedRates = ["BTC", "ETC", "ETH", "LTC", "XRP"];

function returnImgName(abr) {
  switch (abr) {
    case "BTC":
      return "btc";

    case "ETC":
      return "etc";

    case "ETH":
      return "eth";

    case "LTC":
      return "ltc";

    case "XRP":
      return "xrp";

    default:
      return "btc";
  }
}

function returnFullName(abr) {
  switch (abr) {
    case "BTC":
      return "Bitcoin";

    case "ETC":
      return "Etherium Classic";

    case "ETH":
      return "Etherium";

    case "LTC":
      return "Litecoin";

    case "XRP":
      return "Ripple";

    default:
      return "Bitcoin";
  }
}

function returnCurrencySymbol(curr) {
  switch (curr) {
    case "BTC":
      return "Ƀ";

    case "EUR":
      return "€";

    case "GBP":
      return "£";

    case "USD":
      return "$";

    default:
      return "£";
  }
}

function refreshRates(e) {
  const target = e.target;
  const parent = target.parentElement;

  if (target.id === "refreshRates" || parent.id === "refreshRates") {
    // Refresh those rates
    getRatesData();
    // add feedback once refreshed!! *** TODO ***
  }

  const ratesContainer = document.getElementById("rates");
  if (target.id === "refreshRates") {
    rotateRefreshBtn(target);
    flashWhiteScreen(ratesContainer);
  } else if (parent.id === "refreshRates") {
    rotateRefreshBtn(parent);
    flashWhiteScreen(ratesContainer);
  }

  function rotateRefreshBtn(el) {
    el.classList.add("refresh--rotate");
    setTimeout(function() {
      el.classList.remove("refresh--rotate");
    }, 400);
  }

  function flashWhiteScreen(el) {
    el.classList.add("rates__container--refresh");
    setTimeout(function() {
      el.classList.remove("rates__container--refresh");
    }, 1000);
  }
} // END refreshRates fn

function updateExtensionIcon(e) {
  const pathTo = e.path;
  pathTo.forEach(el => {
    if (el.tagName === "ARTICLE") {
      chrome.browserAction.setIcon({
        path: `./images/32/color/${returnImgName(el.id)}.png`
      });
      chrome.browserAction.setBadgeText({
        text: ""
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
    // setBadgeTxt("UP");
    setBadgeTxt("");
  }

  function priceDown(red) {
    setBadgeBGColor(red);
    // setBadgeTxt("DWN");
    setBadgeTxt("");
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
  // refreshRates(e);
  updateExtensionIcon(e);
});
