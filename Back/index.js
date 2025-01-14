const { default: puppeteer } = require('puppeteer');

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.$eval(
    'button.jad_cmp_paywall_button.jad_cmp_paywall_button-cookies ',
    (el) => el.click()
  );
};

scrapper('https://www.sensacine.com/peliculas/mejores-peliculas/');
