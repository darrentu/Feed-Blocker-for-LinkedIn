const msgForChange = "changed"; // message for when there is a change in the url

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo) => {
    if (changeInfo.url && changeInfo.url.includes("https://www.linkedin.com")) {

      // Use sendMessage with a callback to handle potential errors gracefully.
      chrome.tabs.sendMessage(tabId, { message: msgForChange, url: changeInfo.url }, (response) => {
        if (chrome.runtime.lastError) {
          // Handle the error gracefully. For example, log it or take alternative actions.
          console.log('Error sending message:', chrome.runtime.lastError.message);
        }
      });
    }
  }
);