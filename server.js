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


async function checkCollectionExists(collectionName) {
  const collections = await mongoose.connection.db.listCollections().toArray();
  return collections.some(coll => coll.name === collectionName);
}


app.get('/api/expresiones', async (req, res) => {
  try {
    const collectionExists = await checkCollectionExists('expresiones');
    if (!collectionExists) {
      return res.status(400).json({ error: 'La colección "Expresiones" no existe en la base de datos.' });
    }

    const respuesta = await Expresiones.findOne();  
    if (respuesta) {
      res.json({ descripcion: respuesta.descripcion });
    } else {
      res.json({ descripcion: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: `Error al obtener respuesta de "Expresiones". ${err.message}` });
  }
});

app.get('/api/historia', async (req, res) => {
  try {
    const collectionExists = await checkCollectionExists('historia');
    if (!collectionExists) {
      return res.status(400).json({ error: 'La colección "Historia" no existe en la base de datos.' });
    }

    const respuesta = await Historia.findOne();  
    if (respuesta) {
      res.json({ descripcion: respuesta.descripcion });
    } else {
      res.json({ descripcion: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: `Error al obtener respuesta de "Historia". ${err.message}` });
  }
});

// Obtener respuesta de "FuncionamientoApp"
app.get('/api/funcionamientoApp', async (req, res) => {
  try {
    const collectionExists = await checkCollectionExists('funcionamientoApp');
    if (!collectionExists) {
      return res.status(400).json({ error: 'La colección "FuncionamientoApp" no existe en la base de datos.' });
    }

    const respuesta = await FuncionamientoApp.findOne(); 
    if (respuesta) {
      res.json({ descripcion: respuesta.descripcion });
    } else {
      res.json({ descripcion: 'Lo siento, no tengo información sobre este tema.' });
    }
  } catch (err) {
    res.status(500).json({ error: `Error al obtener respuesta de "FuncionamientoApp". ${err.message}` });
  }
});

app.post('/api/expresiones', async (req, res) => {
  try {
    const collectionExists = await checkCollectionExists('expresiones');
    if (!collectionExists) {
      return res.status(400).json({ error: 'La colección "Expresiones" no existe en la base de datos.' });
    }

    const { descripcion } = req.body;
    const nuevaExpresion = new Expresiones({ descripcion });
    await nuevaExpresion.save();
    res.status(201).json({ message: 'Expresión agregada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar la expresión' });
  }
});

app.get('/', (req, res) => {
  res.send('¡Hola! El servidor está funcionando.');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
