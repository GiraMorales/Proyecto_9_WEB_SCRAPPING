// const mongoose = require('mongoose');

// const Data = mongoose.model(
//   'Data',
//   new mongoose.Schema({
//     titulo: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     portada: {
//       type: String,
//       trim: true
//     },
//     sinopsis: {
//       type: String,
//       trim: true
//     }
//   })
// );

// const connect = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/peliculas', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('Conectado a MongoDB 😎');
//   } catch (error) {
//     console.error('Error al conectar a MongoDB 😫', error);
//   }
// };
