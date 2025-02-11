require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const { scrap } = require('./src/scrapper/scrapper');

const PORT = 3000;

const app = express();
connectDB();
app.use(cors());

app.get('/api/v1/peliculas', async (req, res) => {
  try {
    const peliculas = await scrap();
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

app.use('*', (req, res, next) => {
  return res.status(400).json('Ruta no encontrada 🤨');
});

app.listenerCount(PORT, () => {
  console.log('Puerto 30000 levantado');
});
