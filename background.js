chrome.action.onClicked.addListener(async () => {
  // Search for the location "Kerala"
  const searchQuery = 'Kerala';

  // Open a new tab with Google Maps search results
  chrome.tabs.create({ url: `https://www.google.com/maps/search/${searchQuery}` }, async (tab) => {
    // Wait for the tab to finish loading
    chrome.tabs.onUpdated.addListener(async function listener(tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);

        // Inject content script to scrape data from Google Maps
        chrome.tabs.executeScript(tabId, { file: 'content.js' }, () => {
          // Send a message to the content script to initiate scraping
          chrome.tabs.sendMessage(tabId, { query: searchQuery });
        });
      }
    });
  });
});
