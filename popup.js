document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startScraping').addEventListener('click', scrapeGoogleMapsAndExport);
});

async function scrapeGoogleMapsAndExport() {
  const results = [];

  // Extract data from search results
  const resultElements = document.querySelectorAll('.section-result-content');
  resultElements.forEach((element) => {
    const name = element.querySelector('.section-result-title span span').textContent.trim();
    const phoneNumber = element.querySelector('.section-result-info-container .section-result-phone-number').textContent.trim();
    const location = element.querySelector('.section-result-location').textContent.trim();

    results.push([name, phoneNumber, location]);
  });

  // Export the scraped data to an Excel file
  const sheetValues = [...results];

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(sheetValues);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  saveExcelFile(excelBuffer, 'scraped_data.xlsx');
}

function saveExcelFile(buffer, fileName) {
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  link.click();
  URL.revokeObjectURL(url);
}
