require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const PeliculasRoutes = require('./src/api/rutas/peliculas');
const launchScraper = require('./src/scrapper/scrapperLauncher');
const PORT = 3000;

const app = express();
connectDB();

app.use(cors());
app.use('/api/v1', PeliculasRoutes);
app.use('*', (req, res, next) => {
  return res.status(400).json('Ruta no encontrada 🤨');
});

launchScraper();

app.listen(PORT, () => {
  console.log('Puerto 3000 levantado: http://localhost:3000');
});
