chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.query) {
    // Extract data from search results
    const results = [];
    const resultElements = document.querySelectorAll('.section-result-content');
    resultElements.forEach((element) => {
      const name = element.querySelector('.section-result-title span span').textContent.trim();
      const phoneNumber = element.querySelector('.section-result-info-container .section-result-phone-number').textContent.trim();
      const location = element.querySelector('.section-result-location').textContent.trim();
      results.push({ name, phoneNumber, location });
    });

    // Send the scraped data back to the background script
    chrome.runtime.sendMessage({ results });
  }
});
