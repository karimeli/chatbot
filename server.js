const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware para procesar las solicitudes JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/chatbot", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.error('Error de conexión: ', err));

// Definición de los esquemas directamente en el archivo
const Schema = mongoose.Schema;

// Esquema para "expresiones"
const expresionesSchema = new Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true }
});

// Esquema para "historia"
const historiaSchema = new Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true }
});

// Esquema para "funcionamientoapp"
const funcionamientoAppSchema = new Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true }
});

// Modelos para las colecciones en MongoDB
const Expresion = mongoose.model('Expresion', expresionesSchema);
const Historia = mongoose.model('Historia', historiaSchema);
const FuncionamientoApp = mongoose.model('FuncionamientoApp', funcionamientoAppSchema);

// Ruta para manejar las preguntas y devolver respuestas
app.post('/pregunta', async (req, res) => {
  const preguntaUsuario = req.body.pregunta;  // Obtener la pregunta enviada
  console.log("Pregunta recibida:", preguntaUsuario);  // Mostrar la pregunta recibida en consola
  let respuesta;

  try {
    // Buscar en la colección "expresiones"
    respuesta = await Expresion.findOne({ pregunta: preguntaUsuario });
    console.log("Respuesta de Expresion:", respuesta);  // Log de la respuesta de expresiones
    
    if (!respuesta) {
      // Si no se encuentra, buscar en "historia"
      respuesta = await Historia.findOne({ pregunta: preguntaUsuario });
      console.log("Respuesta de Historia:", respuesta);  // Log de la respuesta de historia
    }
    
    if (!respuesta) {
      // Si aún no se encuentra, buscar en "funcionamientoapp"
      respuesta = await FuncionamientoApp.findOne({ pregunta: preguntaUsuario });
      console.log("Respuesta de FuncionamientoApp:", respuesta);  // Log de la respuesta de funcionamientoapp
    }

    // Si se encuentra la respuesta, devolverla
    if (respuesta) {
      console.log("Respuesta encontrada:", respuesta.respuesta);  // Log de la respuesta final encontrada
      res.json({ respuesta: respuesta.respuesta });  // Enviar la respuesta al frontend
    } else {
      // Si no se encuentra la respuesta en ninguna colección
      res.json({ respuesta: "Lo siento, no sé cómo responder esa pregunta." });
    }
  } catch (err) {
    // Si ocurre un error en el proceso de búsqueda
    res.status(500).json({ message: "Error al buscar la pregunta." });
    console.error("Error al buscar la pregunta:", err);  // Log de error
  }
});

// Configuración del puerto
const PORT = process.env.PORT || 54112;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
