const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema(
  {
    Género: { type: String, required: true },
    Título: { type: String, required: true },
    Pantalla: { type: String, required: true },
    Sipnosis: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'Peliculas'
  }
);

const Peliculas = mongoose.model('Peliculas', PeliculaSchema, 'Peliculas');
module.exports = Peliculas;
