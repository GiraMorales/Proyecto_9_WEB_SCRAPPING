const { scrap } = require('../../scrapper/scrapper');
const Peliculas = require('../modelo/peliculas');

const buscarpeliculas = async (req, res, next) => {
  try {
    console.log('Obteniendo películas');
    const peliculas = await scrap();

    // Llamamos a la función que guarda las películas en la base de datos
    await guardarPeliculasEnDB(peliculas);
    res.status(200).json(peliculas);
    console.log('Películas obtenidas y guardadas');
  } catch (error) {
    console.log('Error al obtener las películas');
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
};

const buscarGenero = async (req, res, next) => {
  try {
    const { genero } = req.params;

    if (!genero || typeof genero !== 'string') {
      return res
        .status(400)
        .json({ error: 'Debes proporcionar un género válido' });
    }

    console.log(`🔍 Buscando películas del género: ${genero}`);
    const peliculasGenero = await scrap(genero.trim());

    if (peliculasGenero.length === 0) {
      return res
        .status(404)
        .json({ mensaje: `No se encontraron películas de género "${genero}"` });
    }

    res.status(200).json(peliculasGenero);
  } catch (error) {
    console.error('❌ Error al obtener las películas:', error);
    res
      .status(500)
      .json({ error: 'Error al obtener las películas por género' });
  }
};

const guardarPeliculasEnDB = async (peliculasArray) => {
  try {
    // Guardar cada película en la base de datos
    for (const pelicula of peliculasArray) {
      const nuevaPelicula = new Peliculas({
        genero: pelicula.generos.join(', '), // Convertir array a string separado por comas
        titulo: pelicula.title,
        portada: pelicula.portada,
        sipnosis: pelicula.sipnosis
      });

      await nuevaPelicula.save();
      console.log('Película guardada en la base de datos:', pelicula.title);
    }
  } catch (error) {
    console.error('Error al guardar las películas en la base de datos:', error);
  }
};
module.exports = { buscarpeliculas, buscarGenero, guardarPeliculasEnDB };
