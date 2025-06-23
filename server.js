const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;


async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.log('Error de conexión a MongoDB', err);
  }
}

connectDB();


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
    const respuesta = await General.findOne({
      $text: { $search: pregunta },
      categoria: categoria
    });

    if (respuesta) {
      return respuesta.respuesta;
    } else {
      return 'Lo siento, no tengo información sobre este tema.';
    }
  } catch (err) {
    return `Error al obtener datos de la categoría "${categoria}". ${err.message}`;
  }
};


app.get('/api/expresiones', async (req, res) => {
  const { pregunta } = req.query;
  console.log('Pregunta recibida en /api/expresiones:', pregunta);

  const respuesta = await getResponse('expresiones', pregunta);
  res.json({ respuesta });
});


app.get('/api/historia', async (req, res) => {
  const { pregunta } = req.query;
  console.log('Pregunta recibida en /api/historia:', pregunta);

  const respuesta = await getResponse('historia', pregunta);
  res.json({ respuesta });
});

// Consulta para "funcionamientoApp"
app.get('/api/funcionamientoApp', async (req, res) => {
  const { pregunta } = req.query;
  console.log('Pregunta recibida en /api/funcionamientoApp:', pregunta);

  const respuesta = await getResponse('funcionamientoApp', pregunta);
  res.json({ respuesta });
});


app.get('/', (req, res) => {
  res.send('¡Hola! El servidor está funcionando.');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
