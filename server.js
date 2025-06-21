const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

const port = 3000;


mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión a MongoDB', err));

// Definir los esquemas y modelos de MongoDB
const expresionesSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const historiaSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const funcionamientoAppSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Modelos de MongoDB
const Expresiones = mongoose.model('Expresiones', expresionesSchema);
const Historia = mongoose.model('Historia', historiaSchema);
const FuncionamientoApp = mongoose.model('FuncionamientoApp', funcionamientoAppSchema);


app.use(bodyParser.json());


app.get('/api/expresiones', async (req, res) => {
  try {
    const respuesta = await Expresiones.findOne();  
    if (respuesta) {
      res.json({ descripcion: respuesta.descripcion });
    } else {
      res.json({ descripcion: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener respuesta de "Expresiones"' });
  }
});

app.get('/api/historia', async (req, res) => {
  try {
    const respuesta = await Historia.findOne();  
    if (respuesta) {
      res.json({ descripcion: respuesta.descripcion });
    } else {
      res.json({ descripcion: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener respuesta de "Historia"' });
  }
});

app.get('/api/funcionamientoApp', async (req, res) => {
  try {
    const respuesta = await FuncionamientoApp.findOne(); 
    if (respuesta) {
      res.json({ descripcion: respuesta.descripcion });
    } else {
      res.json({ descripcion: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener respuesta de "FuncionamientoApp"' });
  }
});


app.get('/', (req, res) => {
  res.send('¡Hola! El servidor está funcionando.');
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
