# Feed Blocker for LinkedIn :no_entry_sign: :newspaper:

![Demo](https://lh3.googleusercontent.com/5Q1whlv-yRkXiIKcKvpHHaAa1AiKb3GUfYK-tB9uyhnDisg-lfJX9vjePvDaONaAmVgfNoIKJ8Y=w640-h400-e365)

Links: [Chrome Web Store](https://chrome.google.com/webstore/detail/feed-blocker-for-linkedin/eikaafmldiioljlilngpogcepiedpenf?hl=en) | [Youtube Demo Link](https://www.youtube.com/watch?v=PeV_By7imjE)
 

Introducing Feed Blocker for LinkedIn. With this extension, you can block both your feed and the "Today's News and Views" section on LinkedIn. 

### Features

- Block your LinkedIn Feed
- Block LinkedIn's "Today's News and Views"


###  FAQ (Frequently Asked Questions)

#### When I click on the toggle, it doesn't block the feed! What's going on?

LinkedIn frequently releases new code. If it doesn't work, it's probably because LinkedIn just recently updated their code base. If I notice it, I will fix it and push an update to this extension. Feel free to comment within the reviews tab if no update has occurred.

#### Why does it require my browsing history? 

The browsing history permission is very misleading here. I require to use the [Chrome tabs API](https://developer.chrome.com/extensions/tabs). Chrome tabs API has functions to access your browsing history. This extension only uses the [onUpdated event](https://developer.chrome.com/extensions/tabs#event-onUpdated) of the Chrome tabs API. This is because LinkedIn works as a single paged application. I need the Chrome tabs api information to indicate when the url in the browser has changed. This is because I would need to remove the 'feed' and the "Today's news" again when a user goes back onto the feed. 

Without the tabs api, when you click onto another tab (such as LinkedIn Messaging) and then click back onto LinkedIn Home, the feed and news will reload back onto the page (when it should be removed).

### DISCLAIMER:

I do not store any of your data. The only data that is stored is kept on your own computer. This is needed for Chrome to remember what you selected to hide when you refresh your page.

Feed Blocker for LinkedIn is not affiliated with LinkedIn.
