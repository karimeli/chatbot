const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://Karim32:1234@chat.lzqoimw.mongodb.net/chatbot?retryWrites=true&w=majority')
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB', err));


const preguntaSchema = new mongoose.Schema({
    pregunta: String,
    respuesta: String
}, { collection: 'question' }); 

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

app.post('/ask', async (req, res) => {
    const { pregunta } = req.body;

    try {
  
        const respuesta = await Pregunta.findOne({ pregunta: new RegExp(pregunta, 'i') });
        
        if (respuesta) {
            res.json({ respuesta: respuesta.respuesta });
        } else {
            res.json({ respuesta: "Lo siento, no tengo una respuesta para esa pregunta." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener la respuesta." });
    }
});


app.get('/', (req, res) => {
  res.send('Servidor de preguntas en funcionamiento');
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
