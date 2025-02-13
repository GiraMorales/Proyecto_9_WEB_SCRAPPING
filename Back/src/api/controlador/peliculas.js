const { scrap } = require('../../scrapper/scrapper');
const puppeteer = require('puppeteer');
const Peliculas = require('../modelo/peliculas');

// const buscarGenero = async (req, res, next) => {
//   try {
//     console.log('Obteniendo películas');
//     const { genero } = req.params;
//     const url = `https://www.sensacine.com/peliculas/en-cartelera/cines/${genero}`;
//     const peliculasGenero = await scrap(url);
//     res.status(200).json(peliculasGenero);
//     console.log('Películas por género obtenidas');
//   } catch (error) {
//     console.log('Error al obtener las películas por género');
//     res
//       .status(500)
//       .json({ error: 'Error al obtener las películas por género' });
//   }
// };

const buscarpeliculas = async (req, res, next) => {
  try {
    console.log('Obteniendo películas');
    const peliculas = scrap();
    res.status(200).json(peliculas);
    console.log('Películas obtenidas');
  } catch (error) {
    console.log('Error al obtener las películas');
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
};
module.exports = { buscarpeliculas };
