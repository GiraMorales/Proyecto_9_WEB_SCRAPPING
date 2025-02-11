const puppeteer = require('puppeteer');

const scrap = async (url) => {
  // nuestro buscador
  const browser = await puppeteer.launch({
    headless: false,
    //para que se muestre en pantalla completa
    defaultViewport: null,
    args: ['--start-maximized']
  });
  // creamos la pagina
  const page = await browser.newPage();
  await page.goto(url);

  // si la pagina tiene un boton de aceptar cookies hacemos un codigo que lo acepte
  await page.$eval('.css-xlut8b', (el) => el.click());
};

scrap('https://www.filmaffinity.com/es/topcat.php?id=new_th_es');
