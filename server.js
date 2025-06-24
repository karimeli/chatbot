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

// Esquema para almacenar las preguntas y respuestas
const General = mongoose.model('General', new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  categoria: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}).index({ pregunta: 'text' }));

app.use(bodyParser.json());

// Función para obtener respuestas generales
const getResponse = async (categoria, pregunta) => {
  try {
    console.log('Realizando búsqueda en la categoría:', categoria, 'con la pregunta:', pregunta); // Depuración
    
    // Usamos .find() para encontrar todas las coincidencias en lugar de .findOne()
    const respuestas = await General.find({
      $text: { $search: pregunta },
      categoria: categoria
    });

    // Si encontramos respuestas, las devolvemos; de lo contrario, un mensaje de no encontrado.
    if (respuestas.length > 0) {
      // Si hay varias respuestas, las unimos en un solo string
      return respuestas.map(res => res.respuesta).join(' ');
    } else {
      return 'Lo siento, no tengo información sobre este tema.';
    }
  } catch (err) {
    console.log('Error en getResponse:', err); // Depuración
    return `Error al obtener datos de la categoría "${categoria}". ${err.message}`;
  }
};

// Ruta para "expresiones"
app.get('/api/expresiones', async (req, res) => {
  const { pregunta } = req.query;
  console.log('Pregunta recibida en /api/expresiones:', pregunta); // Depuración

  const respuesta = await getResponse('expresiones', pregunta);
  res.json({ respuesta });
});

// Ruta para "historia"
app.get('/api/historia', async (req, res) => {
  const { pregunta } = req.query;
  console.log('Pregunta recibida en /api/historia:', pregunta); // Depuración

  const respuesta = await getResponse('historia', pregunta);
  res.json({ respuesta });
});

// Ruta para "funcionamientoApp"
app.get('/api/funcionamientoApp', async (req, res) => {
  const { pregunta } = req.query;
  console.log('Pregunta recibida en /api/funcionamientoApp:', pregunta); // Depuración

  const respuesta = await getResponse('funcionamientoApp', pregunta);
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
