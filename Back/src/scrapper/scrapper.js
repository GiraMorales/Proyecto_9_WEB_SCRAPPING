const puppeteer = require('puppeteer');
// const mongoose = require('mongoose');

const scrapePeliculas = async () => {
  await connect();

  const url = 'https://www.filmaffinity.com/es/topcat.php?id=new_th_es';

  const browser = await puppeteer.launch({
    //para levantarlo con un navegardor que le pidamos que se muestre
    headless: false,
    //para que se muestre en pantalla completa
    defaultViewport: null,
    args: ['--start-maximized']
  });
  //para abrir una nueva pestaña
  const page = await browser.newPage();
  //para ir a la url que le pasamos
  await page.goto(url);
};

module.exports = { scrapePeliculas };
