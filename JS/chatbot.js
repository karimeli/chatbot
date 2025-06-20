const { Expresiones, Historia, FuncionamientoApp } = require('./db.js');  // Ruta relativa ahora que db.js está en la misma carpeta

const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBoxBody = document.getElementById('chatbox-body');
const historyButton = document.getElementById('history-btn');
let history = [];  // Historial de mensajes

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
sendButton.addEventListener('click', async function() {
  const userMessage = chatInput.value;

  if (userMessage.trim() === '') return;

  // Agregar mensaje del usuario
  addUserMessage(userMessage);

  // Limpiar el campo de entrada
  chatInput.value = '';

  // Responder solo a preguntas, validando si termina en "?"
  if (userMessage.trim().endsWith('?')) {
    let botResponse = "";

    try {
      // Buscar las respuestas correspondientes a las colecciones
      if (userMessage.toLowerCase().includes("expresiones")) {
        const respuesta = await Expresiones.findOne();  // Esperar la respuesta de MongoDB
        botResponse = respuesta ? respuesta.descripcion : "Lo siento, no tengo información sobre este tema.";
        addBotMessage(botResponse);

      } else if (userMessage.toLowerCase().includes("historia")) {
        const respuesta = await Historia.findOne();  // Esperar la respuesta de MongoDB
        botResponse = respuesta ? respuesta.descripcion : "Lo siento, no tengo información sobre este tema.";
        addBotMessage(botResponse);

      } else if (userMessage.toLowerCase().includes("funcionamiento de la app")) {
        const respuesta = await FuncionamientoApp.findOne();  // Esperar la respuesta de MongoDB
        botResponse = respuesta ? respuesta.descripcion : "Lo siento, no tengo información sobre este tema.";
        addBotMessage(botResponse);

      } else {
        botResponse = "Lo siento, no tengo información sobre ese tema. ¿Puedes hacer otra pregunta?";
        addBotMessage(botResponse);
      }
    } catch (err) {
      console.error("Error al obtener la respuesta de MongoDB:", err);
      addBotMessage("Hubo un problema al obtener la respuesta, por favor intenta de nuevo.");
    }
  } else {

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
  alert(historyText);  // Mostramos el historial en un popup
});
