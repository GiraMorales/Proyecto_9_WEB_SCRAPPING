require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const PeliculasRoutes = require('./src/api/rutas/genero');

const PORT = 3000;

const app = express();
connectDB();
app.use(cors());

app.get('/api/v1/', PeliculasRoutes);

app.use('*', (req, res, next) => {
  return res.status(400).json('Ruta no encontrada 🤨');
});

app.listen(PORT, () => {
  console.log('Puerto 30000 levantado');
});
