const mongoose = require('mongoose');

// URI de conexión a MongoDB local
const mongoURI = 'mongodb://localhost:27017/chatbotDB'; // Asegúrate de que MongoDB esté corriendo en este puerto

// Conectar a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB local'))
  .catch(err => console.log('Error de conexión a MongoDB', err));

// Esquema de la colección "¿Cómo se estructura una palabra?"
const palabraSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Esquema de la colección "Soporte técnico"
const soporteTecnicoSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Esquema de la colección "Funcionamiento del guante"
const guanteSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Modelos para cada colección
const Palabra = mongoose.model('Palabra', palabraSchema);
const SoporteTecnico = mongoose.model('SoporteTecnico', soporteTecnicoSchema);
const Guante = mongoose.model('Guante', guanteSchema);

// Exportar los modelos para su uso en otros archivos
module.exports = {
  Palabra,
  SoporteTecnico,
  Guante
};
