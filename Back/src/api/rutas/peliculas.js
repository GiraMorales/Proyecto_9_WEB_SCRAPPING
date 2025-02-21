const {
  buscarpeliculas,
  buscarGenero,
  guardarPeliculasEnDB
} = require('../controlador/peliculas');
const PeliculasRoutes = require('express').Router();

PeliculasRoutes.get('/peliculas', buscarpeliculas, guardarPeliculasEnDB);
PeliculasRoutes.get('/peliculas/:generos', buscarGenero);

module.exports = PeliculasRoutes;
