const maxPing = 5;
const waitBetweenPings = 100; //in milliseconds
const msgForChange = "changed"; // message for when there is a change in the url

/////////////////////////////////////
// Feed = lineForSorting.nextElementSibling;
// news feed = document.getElementsByClassName("feed-shared-news-module")[0]
/////////////////////////////////////

/**
 * The reason why getElementsByClassName("artdeco-dropdown")[1] isn't using a variable name
 * is because the variable will keep the reference of the variable. If you remove() on the variable,
 * you will remove the reference. If you were to click into LinkedIn messaging, and then click back
 * into the LinkedIn feed, the feed will reload back in and the blocker wouldn't work. I believe
 * LinkedIn is a single page application. 
 */

function removeFeed() {
  
  if (document.getElementsByClassName("artdeco-dropdown")[1]) {
    if (document.getElementsByClassName("artdeco-dropdown")[1].nextElementSibling) {
      document.getElementsByClassName("artdeco-dropdown")[1].nextElementSibling.remove();
    }
    document.getElementsByClassName("artdeco-dropdown")[1].remove();
  }
}

/**
 * For some odd reason, the news seem to load much slower than the feed. Therefore, multiple attempts
 * on removing the news is necessary. 
 */

async function attemptToRemoveElement(className) {

  let ping = 0;
  let removed = false;

  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (document.getElementsByClassName(className)[0]) {
          document.getElementsByClassName(className)[0].remove();
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

chrome.runtime.onMessage.addListener((result) => {
  if (result.message = msgForChange) {
      chrome.storage.local.get(['hideFeed', 'hideNews', 'hideCourses'], (res) => {
        if (res.hideFeed) removeFeed();
        if (res.hideNews) attemptToRemoveElement("feed-shared-news-module");
        if (res.hideCourses) attemptToRemoveElement("learning-top-courses");
      });
  }
})

chrome.storage.local.get(['hideFeed', 'hideNews', 'hideCourses'], (res) => {
  if (res.hideFeed) removeFeed();
  if (res.hideNews) attemptToRemoveElement("feed-shared-news-module");
  if (res.hideCourses) attemptToRemoveElement("learning-top-courses");
});




 