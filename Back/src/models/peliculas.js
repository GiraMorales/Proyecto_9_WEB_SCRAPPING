const mongoose = require('mongoose');
const PeliculaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  portada: {
    type: String,
    required: true,
    trim: true
  },
  sinopsis: {
    type: String,
    required: true,
    trim: true
  }
});
const Pelicula = mongoose.model('Pelicula', PeliculaSchema);

module.exports = Pelicula;
