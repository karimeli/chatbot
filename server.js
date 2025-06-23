const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Conexión a MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.log('Error de conexión a MongoDB', err);
  }
}

connectDB();

// Definición de los esquemas con el campo 'pregunta' y 'respuesta'
const expresionesSchema = new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const historiaSchema = new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const funcionamientoAppSchema = new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Modelos de MongoDB
const Expresiones = mongoose.model('Expresiones', expresionesSchema);
const Historia = mongoose.model('Historia', historiaSchema);
const FuncionamientoApp = mongoose.model('FuncionamientoApp', funcionamientoAppSchema);

app.use(bodyParser.json());

// Obtener respuestas de expresiones según la pregunta
app.get('/api/expresiones', async (req, res) => {
  try {
    const { pregunta } = req.query;  // Recibe la pregunta como parámetro en la consulta
    console.log('Pregunta recibida en /api/expresiones:', pregunta); // Depuración: ver qué pregunta se recibe

    // Buscar la respuesta de la pregunta en la colección "Expresiones"
    const respuesta = await Expresiones.findOne({ pregunta });

    // Depuración: mostrar lo que se encuentra
    console.log('Respuesta encontrada en base de datos:', respuesta); // Ver si la respuesta existe

    if (respuesta) {
      res.json({ respuesta: respuesta.respuesta }); // Devuelve la respuesta correspondiente
    } else {
      res.json({ respuesta: 'Lo siento, no tengo información sobre este tema.' }); // Respuesta cuando no se encuentra
    }
  } catch (err) {
    res.status(500).json({ error: `Error al obtener respuestas de "Expresiones". ${err.message}` });
  }
});

// Obtener respuestas de historia según la pregunta
app.get('/api/historia', async (req, res) => {
  try {
    const { pregunta } = req.query;  // Recibe la pregunta como parámetro en la consulta
    console.log('Pregunta recibida en /api/historia:', pregunta); // Depuración: ver qué pregunta se recibe

    // Buscar la respuesta de la pregunta en la colección "Historia"
    const respuesta = await Historia.findOne({ pregunta });

    // Depuración: mostrar lo que se encuentra
    console.log('Respuesta encontrada en base de datos:', respuesta); // Ver si la respuesta existe

    if (respuesta) {
      res.json({ respuesta: respuesta.respuesta });
    } else {
      res.json({ respuesta: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: `Error al obtener respuestas de "Historia". ${err.message}` });
  }
});

// Obtener respuestas de funcionamiento de la app según la pregunta
app.get('/api/funcionamientoApp', async (req, res) => {
  try {
    const { pregunta } = req.query;  // Recibe la pregunta como parámetro en la consulta
    console.log('Pregunta recibida en /api/funcionamientoApp:', pregunta); // Depuración: ver qué pregunta se recibe

    // Buscar la respuesta de la pregunta en la colección "FuncionamientoApp"
    const respuesta = await FuncionamientoApp.findOne({ pregunta });

    // Depuración: mostrar lo que se encuentra
    console.log('Respuesta encontrada en base de datos:', respuesta); // Ver si la respuesta existe

    if (respuesta) {
      res.json({ respuesta: respuesta.respuesta });
    } else {
      res.json({ respuesta: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: `Error al obtener respuestas de "FuncionamientoApp". ${err.message}` });
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola! El servidor está funcionando.');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
