chrome.storage.local.get(['hideFeed'], (res) => {
  if (res.hideFeed == undefined) {
    chrome.storage.local.set({ 'hideFeed': true });
    removeFeed();
  }
});


function removeFeed() {
  if (window.location.href.includes("linkedin.com/feed/")) {
    if (document.getElementsByTagName("main")) {
      
        setTimeout(() => {
          if (document.getElementsByTagName("main")[0]) {
          document.getElementsByTagName("main")[0].remove();
          }
        }, 0);
        
      
    }
  }
}


function attemptToRemoveElement(elementName) {
  if (window.location.href.includes("linkedin.com/feed/")) {
    
      setTimeout(() => {
        if (document.getElementById(elementName)) {
        document.getElementById(elementName).remove();
        }
      }, 0);
    
  }
}


const observer = new MutationObserver(() => {
  try {
    chrome.storage.local.get(['hideFeed', 'hideNews'], (res) => {
      if (res.hideFeed) removeFeed();
      if (res.hideNews) attemptToRemoveElement("feed-news-module");
    });
  } catch(e) {
    console.log("Error inside of observer callback: ", e);
  }
});

const tryObserving = () => {
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    setTimeout(tryObserving, 50);
  }
};

tryObserving();


 