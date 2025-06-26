const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/ChatbotDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.log('Error al conectar a MongoDB:', error));

// Crear el modelo de preguntas y respuestas
const QuestionSchema = new mongoose.Schema({
    pregunta: String,
    respuesta: String
});
const Question = mongoose.model('Question', QuestionSchema);

// Middleware
app.use(cors());

// Ruta para manejar las preguntas usando GET
app.get('/ask', async (req, res) => {
    const userQuestion = req.query.question;

    // Buscar la respuesta en la base de datos
    const question = await Question.findOne({ pregunta: { $regex: userQuestion, $options: 'i' } });

    if (question) {
        res.json({ answer: question.respuesta });
    } else {
        res.json({ answer: 'Lo siento, no tengo una respuesta para esa pregunta.' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
