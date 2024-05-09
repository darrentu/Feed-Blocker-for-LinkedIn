const maxPing = 5;
const waitBetweenPings = 100; //in milliseconds

chrome.storage.local.get(['hideFeed'], (res) => {
  if (res.hideFeed == undefined) {
    chrome.storage.local.set({ 'hideFeed': true });
    removeFeed();
  }
});


function removeFeed() {
  if (window.location.href.includes("linkedin.com/feed/")) {
    if (document.getElementsByTagName("main")) {
      if (document.getElementsByTagName("main")[0]) {
        document.getElementsByTagName("main")[0].remove();
      }
    }
  }
}


/**
 * For some odd reason, the news seem to load much slower than the feed. Therefore, multiple attempts
 * on removing the news is necessary. 
 */

async function attemptToRemoveElement(elementName) {
  if (window.location.href.includes("linkedin.com/feed/")) {
    let ping = 0;
    let removed = false;

    async function wait(ms) {
      return new Promise(resolve => {
        setTimeout(() => {
          if (document.getElementById(elementName)) {
            document.getElementById(elementName).remove();
            removed = true;
          }
          ping = ping + 1;
          resolve();
        }, ms);
      });
    }

    while (!removed && ping < maxPing) {
      await wait(waitBetweenPings);
    }
  }
}

setInterval(() => {
  chrome.storage.local.get(['hideFeed', 'hideNews'], (res) => {
    if (res.hideFeed) removeFeed();
    if (res.hideNews) attemptToRemoveElement("feed-news-module");
  });
}, 500);



 