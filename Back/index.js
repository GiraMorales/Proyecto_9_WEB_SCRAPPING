// const { scrapper } = require('./src/scrapper/scrapper');
const express = require('express');
const { default: puppeteer, Browser } = require('puppeteer');
const { connectDB } = require('./src/config/db');

const app = express();
connectDB();
// app.use('api/v1/fotos/:category', (req, res, next) => {

//   const imgs = scrapper('https://www.freepik.es/fotos');
//   return res.status(200).json(imgs);
// });

// app.use('*', (req, res, next) => {
//   return res.status(404).json('Ruta no encontrada 🤨');
// });
// app.listen(3000, () => {
//   console.log('Base de datos en funcionamiento 😎');
// });
// peliDiv.$eval();

// const fs = require('fs');

// const pelisArray = [];

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const divsmc_poster = await page.$$('.mc-poster');

  console.log(divsmc_poster.length);

  for (let i = 0; i < 10; i++) {
    const div = divsmc_poster[i];
    const img = await div.$eval('img', (e) => e.src);
    console.log(img);
  }
};

// await page.waitForSelector('button.css-xlut8b', { visible: true });
// await page.$eval('button.css-xlut8b', (el) => el.click());
// await repeat(page);
// // Cerrar el navegador cuando todo esté terminado
// await browser.close();
// };
// // Selecciona todos los contenedores de películas
// const repeat = async (page) => {
//   const arrayDivs = await page.$$('.row');
//   for (const peliDiv of arrayDivs) {
//     try {
//       let titulo = await peliDiv.$eval(
//         'a',
//         (el) => el.title || 'Título no disponible'
//       );
//       let portada = await peliDiv
//         .$eval('a > img', (el) => el.src)
//         .catch(async () => {
//           return await peliDiv
//             .$eval('div img', (el) => el.src)
//             .catch(async () => {
//               return await peliDiv
//                 .$eval('div div div.class', (el) => el.src)
//                 .catch(() => 'Portada no disponible');
//             });
//         });

//       // Haz clic en el icono para mostrar la sinopsis
//       const moreInfoButton = await peliDiv.$('.img');
//       if (moreInfoButton) {
//         await moreInfoButton.click();
//         await page.waitForTimeout(2000); // Espera para cargar el contenido
//       }
//       // Extraer la sinopsis después de hacer clic
//       let sypnosis = await peliDiv
//         .$eval('dd.description', (el) => el.textContent.trim())
//         .catch(() => 'Sinopsis no disponible');

//       const peli = {
//         titulo,
//         portada,
//         sypnosis
//       };
//       pelisArray.push(peli);
//     } catch (error) {
//       console.log('error al extraer datos', error);
//     }
//   }
//   // Usar page.evaluate() para buscar el enlace con texto '>>' y hacer clic
//   const nextPageExists = await page.evaluate(() => {
//     const nextPageLink = Array.from(document.querySelectorAll('a')).find(
//       (link) => link.textContent.trim() === '>>'
//     );
//     if (nextPageLink) {
//       nextPageLink.click();
//       return true;
//     }
//     return false;
//   });

//   if (nextPageExists) {
//     // Esperar a que la navegación se complete
//     await page.waitForNavigation({ waitUntil: 'networkidle0' });
//     write(pelisArray);
//     console.log('pasamos a la siguiente paguina');
//     console.log(`Llevamos ${pelisArray.length} recolectados`);

//     await repeat(page);
//   } else {
//     console.log('No se encontró el enlace para la siguiente página');
//     console.log(`Total de películas recolectadas: ${pelisArray.length}`);
//     write(pelisArray); // Guardar los datos cuando ya no haya más páginas
//   }
// };
// const write = (pelisArray) => {
//   fs.writeFile('pelis.json', JSON.stringify(pelisArray), () => {
//     console.log('Archivo escrito');
//   });
// };

// scrapper('https://www.filmaffinity.com/es/category.php?id=2025films');
scrapper('https://m.filmaffinity.com/es/listtopmovies.php?list_id=400');
