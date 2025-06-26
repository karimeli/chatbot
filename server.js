const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Question = require('./model/question');  // Asegúrate de tener el modelo Question correcto

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

// Endpoint para manejar la pregunta del usuario
app.post('/ask', async (req, res) => {
  const { question } = req.body;  // La pregunta enviada por el usuario

  if (!question) {
    return res.status(400).json({ error: 'La pregunta no puede estar vacía.' });
  }

  try {
    // Buscar la pregunta en la base de datos
    const answer = await Question.findOne({ pregunta: question });

    if (answer) {
      // Si la pregunta existe, devolver la respuesta
      return res.json({ answer: answer.respuesta });
    } else {
      // Si no existe, devolver un mensaje de error
      return res.json({ answer: "Lo siento, no tengo una respuesta para esa pregunta." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
