const puppeteer = require('puppeteer');
const fs = require('fs');
const guardarPeliculasEnDB = require('../api/controlador/peliculas');
const buscarGenero = require('../api/controlador/peliculas');
// const Peliculas = require('../api/modelo/peliculas');

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
    await repeat(page, peliculasArray, buscarGenero);
    // Llamamos a la función guardarPeliculasEnDB desde el controlador para guardar las películas en la base de datos
    await guardarPeliculasEnDB(peliculasArray);
    //pasarlo al JSON
    write(peliculasArray);
    console.log('Peliculas extraidas:', peliculasArray);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
  } finally {
    //cerramos el navegador
    await browser.close();
  }
  //Devolver las peliculas obtenidas
  return peliculasArray;
};

//recibimos la pagina y el array de peliculas
const repeat = async (page, peliculasArray, buscarGenero) => {
  //vamos rellenando el array con los datos de las peliculas
  //esperamos a que cargue la pagina
  await page.waitForSelector('li.mdl', { timeout: 20000 });
  //primero selecionamos donde esta todos los datos
  const peliculas = await page.$$('li.mdl');

  //después hacemos un blucle para recorrer todos los datos
  for (const pelicula of peliculas) {
    let generos = [];
    let title = 'Titulo no encontrado';
    let portada = 'Portada no disponible';
    let sipnosis = 'Sin sinopsis';

    //vamos a sacar el genero
    //primero selecionamos donde esta el genero
    const generoElements = await pelicula.$$('.xXx.dark-grey-link');
    // if (generoElements && generoElements.length > 0) {
    //después sacamos los generos
    for (const gen of generoElements) {
      let text = await gen.evaluate((el) => el.textContent.trim());
      if (text) generos.push(text);
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
    peliculasArray.push({ generos, title, portada, sipnosis });
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
    await page.waitForSelector('li.mdl');
    await repeat(page, peliculasArray, buscarGenero);
  } else {
    console.log('No hay más películas.');
  }
  fs.writeFile('./peliculas.json', JSON.stringify(peliculasArray), () => {
    console.log('se escriben los datos');
  });
  // Esperar a que la navegación se complete
  await page.waitForSelector('li.mdl', { timeout: 20000 });
};

module.exports = { scrap };
