// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Permitir solicitudes CORS desde el navegador

// Crear una instancia de Express
const app = express();
const port = 3000;  // Puerto en el que el servidor escuchará

// Middleware
app.use(cors());
app.use(express.json());  // Permitir solicitudes con JSON

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión a MongoDB', err));

// Esquemas de Mongoose

// Esquema para la colección "expresiones"
const expresionesSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Esquema para la colección "historia"
const historiaSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Esquema para la colección "funcionamientoApp"
const funcionamientoAppSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Modelos de las colecciones
const Expresiones = mongoose.model('Expresiones', expresionesSchema);
const Historia = mongoose.model('Historia', historiaSchema);
const FuncionamientoApp = mongoose.model('FuncionamientoApp', funcionamientoAppSchema);

// Rutas de la API

// Obtener las respuestas de "expresiones"
app.get('/api/expresiones', async (req, res) => {
  try {
    const respuesta = await Expresiones.findOne();
    res.json(respuesta || { descripcion: "Lo siento, no tengo información sobre expresiones." });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Obtener las respuestas de "historia"
app.get('/api/historia', async (req, res) => {
  try {
    const respuesta = await Historia.findOne();
    res.json(respuesta || { descripcion: "Lo siento, no tengo información sobre historia." });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Obtener las respuestas de "funcionamientoApp"
app.get('/api/funcionamientoApp', async (req, res) => {
  try {
    const respuesta = await FuncionamientoApp.findOne();
    res.json(respuesta || { descripcion: "Lo siento, no tengo información sobre el funcionamiento de la app." });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
