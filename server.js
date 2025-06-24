const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Conectar con MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.log('Error de conexión a MongoDB', err);
  }
}

connectDB();

// Esquemas para otras categorías, ahora asociadas a colecciones existentes
const Historia = mongoose.model('Historia', new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}).index({ pregunta: 1 }), 'historia'); // Nombre de la colección ya existente

const FuncionamientoApp = mongoose.model('FuncionamientoApp', new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}).index({ pregunta: 1 }), 'funcionamientoApp'); // Nombre de la colección ya existente

const Expresiones = mongoose.model('Expresiones', new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}).index({ pregunta: 1 }), 'expresiones'); // Nombre de la colección ya existente

app.use(bodyParser.json());

// Función para obtener respuestas
const getResponse = async (modelo, pregunta) => {
  try {
    console.log('Realizando búsqueda con la pregunta:', pregunta); // Depuración
    
    // Usamos .findOne() con el índice para encontrar la respuesta
    const respuesta = await modelo.findOne({ pregunta: pregunta });

    // Si encontramos una respuesta, la devolvemos; de lo contrario, un mensaje de no encontrado.
    if (respuesta) {
      return respuesta.respuesta;
    } else {
      return 'Lo siento, no tengo información sobre este tema.';
    }
  } catch (err) {
    console.log('Error en getResponse:', err); // Depuración
    return `Error al obtener datos. ${err.message}`;
  }
};

// Ruta para "expresiones"
app.get('/api/expresiones', async (req, res) => {
  const { pregunta } = req.query;
  console.log('Pregunta recibida en /api/expresiones:', pregunta); // Depuración

  const respuesta = await getResponse(Expresiones, pregunta);
  res.json({ respuesta });
});

// Ruta para "historia"
app.get('/api/historia', async (req, res) => {
  const { pregunta } = req.query;
  console.log('Pregunta recibida en /api/historia:', pregunta); // Depuración

  const respuesta = await getResponse(Historia, pregunta);
  res.json({ respuesta });
});

// Ruta para "funcionamientoApp"
app.get('/api/funcionamientoApp', async (req, res) => {
  const { pregunta } = req.query;
  console.log('Pregunta recibida en /api/funcionamientoApp:', pregunta); // Depuración

  const respuesta = await getResponse(FuncionamientoApp, pregunta);
  res.json({ respuesta });
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola! El servidor está funcionando.');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
