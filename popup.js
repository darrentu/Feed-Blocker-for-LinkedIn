'use strict';

const checkboxFeed = document.getElementById("lk-checkbox-feed");
const checkboxNews = document.getElementById("lk-checkbox-news");

chrome.storage.local.get(['hideFeed', 'hideNews'], (res) => {
    if (res) {
        checkboxFeed.checked = res.hideFeed;
        checkboxNews.checked = res.hideNews;
    }
})

checkboxFeed.addEventListener('change', () => {
    if (checkboxFeed.checked) {
        chrome.storage.local.set({ 'hideFeed': true });
    } else {
        chrome.storage.local.set({ 'hideFeed': false });
    }
});

checkboxNews.addEventListener('change', () => {
    if (checkboxNews.checked) {
        chrome.storage.local.set({ 'hideNews': true });
    } else {
        chrome.storage.local.set({ 'hideNews': false });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("year").textContent = `${new Date().getFullYear()}`;
});