const { scrap } = require('../../scrapper/scrapper');
const Peliculas = require('../modelo/peliculas');

const buscarpeliculas = async (req, res, next) => {
  try {
    console.log('Obteniendo películas');
    const peliculas = await scrap();
    res.status(200).json(peliculas);
    console.log('Películas obtenidas');
  } catch (error) {
    console.log('Error al obtener las películas');
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
};

const guardarPeliculasEnDB = async (peliculasArray) => {
  try {
    // Guardar cada película en la base de datos
    for (const pelicula of peliculasArray) {
      const nuevaPelicula = new Peliculas({
        Género: pelicula.genero,
        Título: pelicula.title,
        Pantalla: pelicula.portada,
        Sipnosis: pelicula.sipnosis
      });

      await nuevaPelicula.save();
      console.log('Película guardada en la base de datos:', pelicula.title);
    }
  } catch (error) {
    console.error('Error al guardar las películas en la base de datos:', error);
  }
};
module.exports = { buscarpeliculas, guardarPeliculasEnDB };
