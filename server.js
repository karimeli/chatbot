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

// Esquemas para otras categorías, usando las colecciones existentes
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

// Función para obtener respuestas por _id o por pregunta
const getResponse = async (modelo, pregunta, id) => {
  try {
    let respuesta;
    if (id) {
      // Si se pasa un _id, buscar por _id
      respuesta = await modelo.findById(id);
    } else {
      // Si no se pasa un _id, buscar por pregunta
      respuesta = await modelo.findOne({ pregunta: { $regex: new RegExp(pregunta, 'i') } });
    }

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

// Ruta para "expresiones" por pregunta o _id
app.get('/expresiones', async (req, res) => {
  const { pregunta, id } = req.query;  // Se puede pasar tanto pregunta como _id
  console.log('Pregunta o ID recibido en /expresiones:', pregunta, id); // Depuración

  const respuesta = await getResponse(Expresiones, pregunta, id);
  res.json({ respuesta });
});

// Ruta para "historia" por pregunta o _id
app.get('/historia', async (req, res) => {
  const { pregunta, id } = req.query;  // Se puede pasar tanto pregunta como _id
  console.log('Pregunta o ID recibido en /historia:', pregunta, id); // Depuración

  const respuesta = await getResponse(Historia, pregunta, id);
  res.json({ respuesta });
});

// Ruta para "funcionamientoApp" por pregunta o _id
app.get('/funcionamientoApp', async (req, res) => {
  const { pregunta, id } = req.query;  // Se puede pasar tanto pregunta como _id
  console.log('Pregunta o ID recibido en /funcionamientoApp:', pregunta, id); // Depuración

  const respuesta = await getResponse(FuncionamientoApp, pregunta, id);
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
