const puppeteer = require('puppeteer');
const fs = require('fs');

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
const repeat = async (page, peliculasArray) => {
  //vamos rellenando el array con los datos de las peliculas
  //esperamos a que cargue la pagina
  await page.waitForSelector('li.mdl', { timeout: 10000 });
  //primero selecionamos donde esta todos los datos
  const peliculas = await page.$$('li.mdl');

  //después hacemos un blucle para recorrer todos los datos
  for (const pelicula of peliculas) {
    let generos = [];
    let title;
    let portada;
    let sipnosis;

    //vamos a sacar el genero
    //primero selecionamos donde esta el genero
    const generoElements = await pelicula.$$('.xXx.dark-grey-link');
    if (generoElements && generoElements.length > 0) {
      //después sacamos los generos
      for (const gen of generoElements) {
        let text = await gen.evaluate((el) => el?.textContent?.trim());
        if (text) generos.push(text);
      }
    } else {
      console.log('No se encontraron generos en esta pelicula');
    }
    // if (generoElementos) {
    //   genero = await generoElement.evaluate((el) => el.textContent.trim());
    // }
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
    await page.waitForSelector('li.mdl', { timeout: 10000 });
    await repeat(page, peliculasArray);
  } else {
    console.log('No hay más películas.');
  }
  // Esperar a que la navegación se complete
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  write(peliculasArray);
  console.log('pasamos a la siguiente página');
  console.log(`Llevamos ${peliculasArray.length} películas recolectadas`);

  // repeat(page);
};

// Función para escribir el archivo JSON
const write = (peliculasArray) => {
  fs.writeFile('pelis.json', JSON.stringify(peliculasArray, null, 2), () => {
    console.log('Archivo escrito');
  });
};

module.exports = { scrap };
