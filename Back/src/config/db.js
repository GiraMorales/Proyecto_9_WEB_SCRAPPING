const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('BBDD conectada 😎');
  } catch (error) {
    console.log('Error en la conexión con la BBDD 🤬', error.message);
  }
};

module.exports = { connectDB };
