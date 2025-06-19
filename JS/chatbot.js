const { Palabra, SoporteTecnico, Guante } = require('../script/DB');  

const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBoxBody = document.getElementById('chatbox-body');
const historyButton = document.getElementById('history-btn');
let history = []; // Historial de mensajes

// Función para agregar mensaje del usuario
function addUserMessage(message) {
  const userMessageElement = document.createElement('div');
  userMessageElement.classList.add('message', 'user');
  userMessageElement.innerHTML = `<p>${message}</p>`;
  chatBoxBody.appendChild(userMessageElement);

  // Agregar al historial de mensajes
  history.push({ type: 'user', message: message });
}

// Función para agregar mensaje del bot
function addBotMessage(responseText) {
  const botMessageElement = document.createElement('div');
  botMessageElement.classList.add('message', 'bot');
  
  let botResponse = responseText || "Gracias por tu mensaje! ¿Cómo más puedo ayudarte?";

  botMessageElement.innerHTML = `<p>${botResponse}</p>`;
  chatBoxBody.appendChild(botMessageElement);

  // Agregar al historial de mensajes
  history.push({ type: 'bot', message: botResponse });
}

// Función para manejar el envío de preguntas
sendButton.addEventListener('click', function() {
  const userMessage = chatInput.value;

  if (userMessage.trim() === '') return;

  // Agregar mensaje del usuario
  addUserMessage(userMessage);

  // Limpiar el campo de entrada
  chatInput.value = '';

  // Responder solo a preguntas, validando si termina en "?"
  if (userMessage.trim().endsWith('?')) {
    let botResponse = "";

    // Buscar las respuestas correspondientes a las colecciones
    if (userMessage.toLowerCase().includes("cómo se estructura una palabra")) {
      Palabra.findOne()  // Buscar una respuesta en la colección "¿Cómo se estructura una palabra?"
        .then(respuesta => {
          botResponse = respuesta ? respuesta.descripcion : "Lo siento, no tengo información sobre este tema.";
          addBotMessage(botResponse);
        })
        .catch(err => console.log("Error al obtener respuesta de la colección '¿Cómo se estructura una palabra?'", err));

    } else if (userMessage.toLowerCase().includes("soporte técnico")) {
      SoporteTecnico.findOne()  // Buscar una respuesta en la colección "Soporte técnico"
        .then(respuesta => {
          botResponse = respuesta ? respuesta.descripcion : "Lo siento, no tengo información sobre este tema.";
          addBotMessage(botResponse);
        })
        .catch(err => console.log("Error al obtener respuesta de la colección 'Soporte técnico'", err));

    } else if (userMessage.toLowerCase().includes("funcionamiento del guante")) {
      Guante.findOne()  // Buscar una respuesta en la colección "Funcionamiento del guante"
        .then(respuesta => {
          botResponse = respuesta ? respuesta.descripcion : "Lo siento, no tengo información sobre este tema.";
          addBotMessage(botResponse);
        })
        .catch(err => console.log("Error al obtener respuesta de la colección 'Funcionamiento del guante'", err));

    } else {
      botResponse = "Lo siento, no tengo información sobre ese tema. ¿Puedes hacer otra pregunta?";
      addBotMessage(botResponse);
    }
  } else {
    // Si no es una pregunta, el bot recuerda que solo responde preguntas
    addBotMessage("Por favor, hazme una pregunta para poder ayudarte.");
  }

  // Hacer scroll hacia abajo en el chat
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
});

// Función para mostrar el historial de prompts
historyButton.addEventListener('click', function() {
  let historyText = "<h3>Historial de Mensajes:</h3>";
  history.forEach(item => {
    historyText += `<p><strong>${item.type.toUpperCase()}:</strong> ${item.message}</p>`;
  });
  alert(historyText); // Mostramos el historial en un popup
});
