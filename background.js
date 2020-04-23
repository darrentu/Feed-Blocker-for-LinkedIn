const msgForChange = "changed"; // message for when there is a change in the url

chrome.tabs.onUpdated.addListener(
    (tabId, tabChanged) => {
      if (tabChanged.url) {
        chrome.tabs.sendMessage( tabId, {
          message: msgForChange,
          url: tabChanged.url
        })
      }
    }
    
);

  