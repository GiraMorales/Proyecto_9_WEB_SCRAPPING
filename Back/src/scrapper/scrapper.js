const { default: puppeteer } = require('puppeteer');

const scrapper = async (url) => {
  const arraysImags = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.$eval('button.css-xlut8b', (el) => el.click());
  const imgPelicula = await page.$$('div.movie-poster'); //selecciona las imagenes

  for (let i = 0; i < 10; i++) {
    const peli = imgPelicula[i];
    const img = await peli.$eval('img', (e) => e.src);
    arraysImags.push(img);
  }
  browser.close();
  return arraysImags;
};

module.exports = { scrapper };
