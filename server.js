const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Conectar con MongoDB usando la URL proporcionada
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/chatbot');
     await mongoose.connection.db.admin().ping();
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.log('Error de conexión a MongoDB', err);
  }
}

connectDB();

// Esquemas para las colecciones existentes con índice de texto
const Historia = mongoose.model('Historia', new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}).index({ pregunta: 'text' }), 'historia'); // Índice de texto en el campo 'pregunta'

const FuncionamientoApp = mongoose.model('FuncionamientoApp', new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}).index({ pregunta: 'text' }), 'funcionamientoApp'); // Índice de texto en el campo 'pregunta'

const Expresiones = mongoose.model('Expresiones', new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}).index({ pregunta: 'text' }), 'expresiones'); // Índice de texto en el campo 'pregunta'

app.use(bodyParser.json());

// Función para obtener respuestas por pregunta usando índice de texto
const getResponseFromAllCollections = async (pregunta) => {
  try {
    let respuesta;
    
    // Buscar en todas las colecciones usando el índice de texto en 'pregunta'
    respuesta = await Expresiones.findOne({ $text: { $search: pregunta } }) ||
               await Historia.findOne({ $text: { $search: pregunta } }) ||
               await FuncionamientoApp.findOne({ $text: { $search: pregunta } });

    // Si encontramos una respuesta, la devolvemos; de lo contrario, un mensaje de no encontrado.
    if (respuesta) {
      return respuesta.respuesta;
    } else {
      return 'Lo siento, no tengo información sobre este tema.';
    }
  } catch (err) {
    console.log('Error en getResponseFromAllCollections:', err); // Depuración
    return `Error al obtener datos. ${err.message}`;
  }
};

// Ruta para buscar en todas las colecciones por pregunta
app.get('/expresiones', async (req, res) => {
  const { pregunta } = req.query;  // Solo se pasará la pregunta
  console.log('Pregunta recibida en /expresiones:', pregunta); // Depuración

  const respuesta = await getResponseFromAllCollections(pregunta);
  res.json({ respuesta });
});

app.get('/historia', async (req, res) => {
  const { pregunta } = req.query;  // Solo se pasará la pregunta
  console.log('Pregunta recibida en /historia:', pregunta); // Depuración

  const respuesta = await getResponseFromAllCollections(pregunta);
  res.json({ respuesta });
});

app.get('/funcionamientoApp', async (req, res) => {
  const { pregunta } = req.query;  // Solo se pasará la pregunta
  console.log('Pregunta recibida en /funcionamientoApp:', pregunta); // Depuración

  const respuesta = await getResponseFromAllCollections(pregunta);
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
