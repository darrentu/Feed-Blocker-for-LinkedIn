'use strict';

const maxPing = 5;
const waitBetweenPings = 100; //in milliseconds

function hideFeed() {
  if (window.location.href.endsWith("feed/")) {
    document.getElementsByTagName("main")[0].style.display = "none";
  }
}

function addFeed() {
  if (window.location.href.endsWith("feed/")) {
    document.getElementsByTagName("main")[0].style.display = null;
  }
}

/**
 * For some odd reason, the news seem to load much slower than the feed. Therefore, multiple attempts
 * on removing the news is necessary. 
 */

async function attemptToHideElement(className) {

  let ping = 0;
  let removed = false;

  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (document.getElementsByClassName(className) && document.getElementsByClassName(className)[0]) {
          document.getElementsByClassName(className)[0].classList.add("displayNone");
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

async function attemptToAddElement(className) {
  let ping = 0;
  let added = false;

  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (document.getElementsByClassName(className) && document.getElementsByClassName(className)[0]) {
          document.getElementsByClassName(className)[0].classList.remove("displayNone");
          added = true;
        }
        ping = ping + 1;
        resolve();
      }, ms);
    });
  }

  while (!added && ping < maxPing) {
    await wait(waitBetweenPings);
  }
}

/*
get the current URL. Since LinkedIn is a single paged application,
we need to check if user has changed the URL within LinkedIn. If it has changed,
attempt to remove the elements again.
*/
let lastUrl = window.location.href; 
setInterval(() => {
  if (window.location.href !== lastUrl) {
    lastUrl = window.location.href;
    chrome.storage.local.get(['hideFeed', 'hideNews', 'hideCourses'], (res) => {
      if (res.hideFeed) hideFeed();
      if (res.hideNews) attemptToHideElement("news-module");
      if (res.hideCourses) attemptToHideElement("learning-top-courses");
    });
  }
  
}, 500)

chrome.storage.onChanged.addListener((res, _) => {
  if (res.hideFeed && res.hideFeed.newValue == true) hideFeed();
  if (res.hideFeed && res.hideFeed.newValue == false) addFeed();
  if (res.hideNews && res.hideNews.newValue == true) attemptToHideElement("news-module");
  if (res.hideNews && res.hideNews.newValue == false) attemptToAddElement("news-module");
  if (res.hideCourses && res.hideCourses.newValue == true) attemptToHideElement("learning-top-courses");
  if (res.hideCourses && res.hideCourses.newValue == false) attemptToAddElement("learning-top-courses");
});

chrome.storage.local.get(['hideFeed', 'hideNews', 'hideCourses'], (res) => {
  if (res.hideFeed) hideFeed();
  if (res.hideNews) attemptToHideElement("news-module");
  if (res.hideCourses) attemptToHideElement("learning-top-courses");
});




 