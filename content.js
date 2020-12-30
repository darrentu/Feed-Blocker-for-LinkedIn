'use strict';

const maxPing = 5;
const waitBetweenPings = 100; //in milliseconds


/**
 * The reason why getElementsByClassName("artdeco-dropdown")[1] isn't using a variable name
 * is because the variable will keep the reference of the variable. If you remove() on the variable,
 * you will remove the reference. If you were to click into LinkedIn messaging, and then click back
 * into the LinkedIn feed, the feed will reload back in and the blocker wouldn't work. I believe
 * LinkedIn is a single page application. 
 */

function hideFeed() {
  
  if (document.getElementsByClassName("artdeco-dropdown") && document.getElementsByClassName("artdeco-dropdown")[1]) {
    if (document.getElementsByClassName("artdeco-dropdown")[1].nextElementSibling) {
      document.getElementsByClassName("artdeco-dropdown")[1].nextElementSibling.classList.add("displayNone");
    }
  }
}

function addFeed() {
  
  if (document.getElementsByClassName("artdeco-dropdown") && document.getElementsByClassName("artdeco-dropdown")[1]) {
    if (document.getElementsByClassName("artdeco-dropdown")[1].nextElementSibling) {
      document.getElementsByClassName("artdeco-dropdown")[1].nextElementSibling.classList.remove("displayNone");
    }
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

<<<<<<< HEAD
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
=======
chrome.runtime.onMessage.addListener((result) => {
  if (result.message = msgForChange) {
      chrome.storage.local.get(['hideFeed', 'hideNews', 'hideCourses'], (res) => {
        if (res.hideFeed) removeFeed();
        if (res.hideNews) attemptToRemoveElement("news-module");
        if (res.hideCourses) attemptToRemoveElement("learning-top-courses");
      });
>>>>>>> 204f67debf8d4c7d139a117313230a7db6f501e2
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
<<<<<<< HEAD
  if (res.hideFeed) hideFeed();
  if (res.hideNews) attemptToHideElement("news-module");
  if (res.hideCourses) attemptToHideElement("learning-top-courses");
=======
  if (res.hideFeed) removeFeed();
  if (res.hideNews) attemptToRemoveElement("news-module");
  if (res.hideCourses) attemptToRemoveElement("learning-top-courses");
>>>>>>> 204f67debf8d4c7d139a117313230a7db6f501e2
});




 