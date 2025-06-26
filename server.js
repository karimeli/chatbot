const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Crear la aplicación Express
const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión a MongoDB:', err));

// Definir el modelo de datos para las preguntas y respuestas
const Question = mongoose.model('Question', new mongoose.Schema({
  pregunta: String,
  respuesta: String
}));

// Ruta para obtener todas las preguntas (sin permitir inserción)
app.get('/api/get-questions', async (req, res) => {
  const questions = await Question.find();
  res.json({ questions });
});

// Ruta para obtener la respuesta de una pregunta específica
app.get('/api/get-answer/:questionId', async (req, res) => {
  const question = await Question.findById(req.params.questionId);
  if (question) {
    res.json({ answer: question.respuesta });
  } else {
    res.status(404).json({ answer: 'Pregunta no encontrada.' });
  }
});

// Iniciar el servidor en el puerto 3000
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
