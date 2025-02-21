const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema(
  {
    genero: { type: String },
    titulo: { type: String },
    portada: { type: String },
    sipnosis: { type: String }
  },
  {
    timestamps: true,
    collection: 'Peliculas'
  }
);

const Peliculas = mongoose.model('Peliculas', PeliculaSchema, 'Peliculas');
module.exports = Peliculas;
