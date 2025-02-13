const puppeteer = require('puppeteer');

const scrap = async () => {
  const url = 'https://www.sensacine.com/peliculas/en-cartelera/cines/';
  const peliculasArray = [];
  // lanzar puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    //para que se muestre en pantalla completa
    defaultViewport: null,
    args: ['--start-maximized']
  });
  // creamos la pagina
  const page = await browser.newPage();
  await page.goto(url);

  // Aceptar cookies si el botón existe
  const button = await page.$('.jad_cmp_paywall_button-cookies');
  if (button) {
    await button.click();
    console.log('Cookies aceptadas.');
  } else {
    console.log('No se encontró el botón de cookies.');
  }
  try {
    //funcion que le ira dando al botón siguiente hasta que no haya más
    await repeat(page, peliculasArray);
    console.log(peliculasArray);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
  } finally {
    //cerramos el navegador
    await browser.close();
  }
};
//recibimos la pagina y el array de peliculas
const repeat = async (page, peliculasArray) => {
  //vamos rellenando el array con los datos de las peliculas
  //esperamos a que cargue la pagina
  await page.waitForSelector('li.mdl', { timeout: 10000 });
  //primero selecionamos donde esta todos los datos
  const peliculas = await page.$$('li.mdl');

  //después hacemos un blucle para recorrer todos los datos
  for (const pelicula of peliculas) {
    let genero;
    let title;
    let portada;
    let sipnosis;

    //vamos a sacar el genero
    //primero selecionamos donde esta el genero
    const generoElement = await pelicula.$('.xXx.dark-grey-link');
    //después sacamos el genero
    if (generoElement) {
      genero = await generoElement.evaluate((el) => el.textContent.trim());
    }
    //vamos a sacar el titulo de la pelicula
    const titleElement = await pelicula.$(
      '.xXx.thumbnail-container.thumbnail-link'
    );
    if (titleElement) {
      title = await titleElement.evaluate((el) => el.title);
    }

    //vamos a sacar la portada de la pelicula
    const portadaElement = await pelicula.$(
      'div.card.entity-card.entity-card-list.cf > figure.thumbnail  > a.xXx.thumbnail-container.thumbnail-link > img.thumbnail-img'
    );
    if (portadaElement) {
      portada = await portadaElement.evaluate((el) => el.src);
    }
    //vamos a sacar la sipnosis de la pelicula
    const sipnosisElement = await pelicula.$('div.content-txt');
    if (sipnosisElement) {
      sipnosis = await sipnosisElement.evaluate((el) => el.textContent.trim());
    }
    peliculasArray.push({ genero, title, portada, sipnosis });
    console.log(peliculasArray);
  }
  const nextButton = await page.$(
    'a.xXx.button.button-md.button-primary-full.button-right'
  );
  if (nextButton) {
    console.log(
      '✔ Botón "Siguiente" encontrado. Pasando a la siguiente página...'
    );
    await nextButton.click();
    // Asegurarse que las películas están disponibles
    await page.waitForSelector('li.mdl', { timeout: 10000 });
    await repeat(page, peliculasArray);
  } else {
    console.log('No hay más películas.');
  }
};

module.exports = { scrap };
