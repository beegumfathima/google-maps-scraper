// This background script listens for events and communicates with content scripts

// Listen for a click on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the content script to start scraping
  chrome.tabs.sendMessage(tab.id, { action: 'startScraping' });
});

// Listen for a message from the content script with the scraped data
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'scrapedData') {
    const scrapedData = message.data;
    // Do something with the scraped data
    console.log(scrapedData);
  }
});
