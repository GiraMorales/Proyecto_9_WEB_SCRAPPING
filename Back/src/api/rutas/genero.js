const { buscarGenero, buscarpeliculas } = require('../controlador/genero');

const PeliculasRoutes = require('express').Router();
PeliculasRoutes.get('/genero', buscarGenero);
PeliculasRoutes.get('/peliculas', buscarpeliculas);

module.exports = PeliculasRoutes;
