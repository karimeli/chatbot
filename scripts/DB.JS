const mongoose = require('mongoose');

// URI de conexión a MongoDB local
const mongoURI = 'mongodb://localhost:27017/chatbot'; 

// Conectar a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión a MongoDB', err));

// Esquema de la colección "expresiones"
const expresionesSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Esquema de la colección "historia"
const historiaSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Esquema de la colección "funcionamientoApp"
const funcionamientoAppSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Modelos para cada colección
const Expresiones = mongoose.model('Expresiones', expresionesSchema);
const Historia = mongoose.model('Historia', historiaSchema);
const FuncionamientoApp = mongoose.model('FuncionamientoApp', funcionamientoAppSchema);

// Exportar los modelos para su uso en otros archivos
module.exports = {
  Expresiones,
  Historia,
  FuncionamientoApp
};
