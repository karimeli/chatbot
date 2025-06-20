const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/chatbot'; 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión a MongoDB', err));


const expresionesSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


const historiaSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


const funcionamientoAppSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Expresiones = mongoose.model('Expresiones', expresionesSchema);
const Historia = mongoose.model('Historia', historiaSchema);
const FuncionamientoApp = mongoose.model('FuncionamientoApp', funcionamientoAppSchema);


module.exports = {
  Expresiones,
  Historia,
  FuncionamientoApp
};
