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

// Esquema común para todas las colecciones
const General = mongoose.model('General', new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  categoria: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}).index({ pregunta: 'text' }));

app.use(bodyParser.json());

// Consulta para "expresiones"
app.get('/api/expresiones', async (req, res) => {
  try {
    const { pregunta } = req.query;
    console.log('Pregunta recibida en /api/expresiones:', pregunta);

    const respuesta = await General.findOne({ 
      $text: { $search: pregunta }, 
      categoria: 'expresiones' 
    });

    if (respuesta) {
      res.json({ respuesta: respuesta.respuesta });
    } else {
      res.json({ respuesta: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: `Error al obtener respuestas de "expresiones". ${err.message}` });
  }
});

// Consulta para "historia"
app.get('/api/historia', async (req, res) => {
  try {
    const { pregunta } = req.query;
    console.log('Pregunta recibida en /api/historia:', pregunta);

    const respuesta = await General.findOne({
      $text: { $search: pregunta },
      categoria: 'historia'
    });

    if (respuesta) {
      res.json({ respuesta: respuesta.respuesta });
    } else {
      res.json({ respuesta: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: `Error al obtener respuestas de "historia". ${err.message}` });
  }
});

// Consulta para "funcionamientoApp"
app.get('/api/funcionamientoApp', async (req, res) => {
  try {
    const { pregunta } = req.query;
    console.log('Pregunta recibida en /api/funcionamientoApp:', pregunta);

    const respuesta = await General.findOne({
      $text: { $search: pregunta },
      categoria: 'funcionamientoApp'
    });

    if (respuesta) {
      res.json({ respuesta: respuesta.respuesta });
    } else {
      res.json({ respuesta: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: `Error al obtener respuestas de "funcionamientoApp". ${err.message}` });
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola! El servidor está funcionando.');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
