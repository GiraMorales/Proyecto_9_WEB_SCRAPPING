const { buscarpeliculas, buscarGenero } = require('../controlador/peliculas');
const PeliculasRoutes = require('express').Router();

PeliculasRoutes.get('/peliculas', buscarpeliculas);
PeliculasRoutes.get('/:generos', buscarGenero);

module.exports = PeliculasRoutes;
