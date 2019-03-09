function pressTheButton(button, popup) {
  // UI elements

  var initialClick = false;
  var randomRange = 6;
  var sitesList = [
    ["https://www.en.d-tt.nl/", false],
    ["https://cat-bounce.com/", false],
    ["https://stackoverflow.com/", false],
    ["https://github.com/", false],
    ["https://greatbignothing.com/", false],
    ["http://www.histography.io/", false],
    ["http://multeor.com/", false],
    ["http://hereistoday.com", false],
    ["https://www.mapstd.com/", false],
    ["http://radio.garden/", false]
  ];

  var sites = null;

  // Prepares and binds the button
  var init = function() {
    button.onclick = onButtonClick;
    sites = sitesList.slice(0);

    /*// If the Browser supports html5 storage
    if (supportsHtmlStorage() === true) {
    	// Check for past data
    	if (localStorage["sites"] !== undefined) {
    		loadSites();
    	}
    }*/
  };

  // Removes flash websites from the list
  var removeFlashWebsites = function() {
    var i, site;
    var newList = [];

    for (i = 0; i < sitesList.length; i++) {
      site = sitesList[i];
      if (site[1] === false) {
        newList.push(site);
      }
    }

    sitesList = newList;
  };

  // Selects and removes the next website from the list
  var selectWebsite = function() {
    var site, range, index;

    range = randomRange > sites.length ? sites.length : randomRange;
    index = Math.floor(Math.random() * range);

    site = sites[index];
    sites.splice(index, 1);

    return site;
  };

  // Opens the given url in a new window
  var openSite = function(url) {
    window.open(url);
  };

  var onButtonClick = function() {
    // Track click count.
    _gaq.push(["_trackEvent", "user", "clicks", "button"]);


    var url = selectWebsite()[0];
    openSite(url);

    if (sites.length == 0) {
      // If the browser doesn't support flash. Remove flash websites from the list.
      // if ( !swfobject.hasFlashPlayerVersion("1") ) {
      // 	removeFlashWebsites();
      // }

      sites = sitesList.slice(0);
    }

    storeSites();
  };

  // Save the current list of sites for the new user.
  var storeSites = function() {
    localStorage["sites"] = JSON.stringify(sites);
  };

  // Load the list of sites, so new users see new sites.
  var loadSites = function() {
    sites = JSON.parse(localStorage["sites"]);
  };

  init();
}
