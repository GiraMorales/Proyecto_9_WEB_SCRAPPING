const { buscarpeliculas } = require('../controlador/peliculas');
const PeliculasRoutes = require('express').Router();

// PeliculasRoutes.get('/:genero', buscarGenero);
PeliculasRoutes.get('/peliculas', buscarpeliculas);

module.exports = PeliculasRoutes;
