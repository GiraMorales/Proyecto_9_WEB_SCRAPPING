const { default: puppeteer } = require('puppeteer');

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
};

scrapper('https://www.sensacine.com/peliculas/mejores-peliculas/');
