const { scrap } = require('../../scrapper/scrapper');
const puppeteer = require('puppeteer');

const buscarGenero = async (req, res, next) => {
  try {
    const { genero } = req.params;
    const peliculasGenero = await scrap(
      `https://www.sensacine.com/peliculas/en-cartelera/cines/${genero}`
    );
    res.status(200).json(peliculasGenero);
    console.log('Películas por genero obtenidas');
  } catch (error) {
    console.log('Error al obtener las películas por genero');
    res
      .status(500)
      .json({ error: 'Error al obtener las películas por genero' });
  }
};

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
module.exports = { buscarGenero, buscarpeliculas };
