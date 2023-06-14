// This content script is injected into web pages

// Listen for a message from the background script to start scraping
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'startScraping') {
    // Extract the data from the web page
    const name = document.querySelector('.name').textContent;
    const phoneNumber = document.querySelector('.phone-number').textContent;
    const location = document.querySelector('.location').textContent;

    // Send the extracted data back to the background script
    chrome.runtime.sendMessage({
      action: 'scrapedData',
      data: {
        name,
        phoneNumber,
        location
      }
    });
  }
});
