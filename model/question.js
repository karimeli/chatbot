const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
