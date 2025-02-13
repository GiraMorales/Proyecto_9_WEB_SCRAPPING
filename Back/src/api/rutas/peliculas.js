const { buscarpeliculas } = require('../controlador/peliculas');
const PeliculasRoutes = require('express').Router();

PeliculasRoutes.get('/peliculas', buscarpeliculas);

module.exports = PeliculasRoutes;
