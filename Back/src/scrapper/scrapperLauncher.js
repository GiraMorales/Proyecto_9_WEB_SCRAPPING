const { scrap } = require('./scrapper');

// scrap();

const launchScraper = async () => {
  console.log('Lanzando el scraper...');
  await scrap();
  console.log('Scraper finalizado.');
};
// Solo llama a launchScraper si este archivo se ejecuta directamente
if (require.main === module) {
  launchScraper();
}

module.exports = launchScraper;
