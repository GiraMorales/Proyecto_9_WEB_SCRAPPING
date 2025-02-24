const { scrap } = require('./scrapper');

// scrap();

const launchScraper = async () => {
  console.log('Lanzando el scraper...');
  await scrap();
  console.log('Scraper finalizado.');
};

module.exports = launchScraper;
