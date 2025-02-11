const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('BBDD conectada 😎');
  } catch (error) {
    console.log('Error en la conexión con la BBDD 🤬');
  }
};

module.exports = { connectDB };
