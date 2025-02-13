const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema(
  {
    Género: { type: String },
    Título: { type: String },
    Pantalla: { type: String },
    Sipnosis: { type: String }
  },
  {
    timestamps: true,
    collection: 'Peliculas'
  }
);

const Peliculas = mongoose.model('Peliculas', PeliculaSchema, 'Peliculas');
module.exports = Peliculas;
