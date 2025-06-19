const { Expresiones, Historia, FuncionamientoApp } = require('../script/db'); 

const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBoxBody = document.getElementById('chatbox-body');
const historyButton = document.getElementById('history-btn');
let history = []; 


function addUserMessage(message) {
  const userMessageElement = document.createElement('div');
  userMessageElement.classList.add('message', 'user');
  userMessageElement.innerHTML = `<p>${message}</p>`;
  chatBoxBody.appendChild(userMessageElement);

 
  history.push({ type: 'user', message: message });
}


function addBotMessage(responseText) {
  const botMessageElement = document.createElement('div');
  botMessageElement.classList.add('message', 'bot');
  
  let botResponse = responseText || "Gracias por tu mensaje! ¿Cómo más puedo ayudarte?";

  botMessageElement.innerHTML = `<p>${botResponse}</p>`;
  chatBoxBody.appendChild(botMessageElement);

 
  history.push({ type: 'bot', message: botResponse });
}


sendButton.addEventListener('click', function() {
  const userMessage = chatInput.value;

  if (userMessage.trim() === '') return;

  
  addUserMessage(userMessage);

  chatInput.value = '';

  // Responder solo a preguntas, validando si termina en "?"
  if (userMessage.trim().endsWith('?')) {
    let botResponse = "";

    // Buscar las respuestas correspondientes a las colecciones
    if (userMessage.toLowerCase().includes("expresiones")) {
      Expresiones.findOne()  // Buscar una respuesta en la colección "expresiones"
        .then(respuesta => {
          botResponse = respuesta ? respuesta.descripcion : "Lo siento, no tengo información sobre este tema.";
          addBotMessage(botResponse);
        })
        .catch(err => console.log("Error al obtener respuesta de la colección 'expresiones'", err));

    } else if (userMessage.toLowerCase().includes("historia")) {
      Historia.findOne()  // Buscar una respuesta en la colección "historia"
        .then(respuesta => {
          botResponse = respuesta ? respuesta.descripcion : "Lo siento, no tengo información sobre este tema.";
          addBotMessage(botResponse);
        })
        .catch(err => console.log("Error al obtener respuesta de la colección 'historia'", err));

    } else if (userMessage.toLowerCase().includes("funcionamiento de la app")) {
      FuncionamientoApp.findOne()  // Buscar una respuesta en la colección "funcionamientoApp"
        .then(respuesta => {
          botResponse = respuesta ? respuesta.descripcion : "Lo siento, no tengo información sobre este tema.";
          addBotMessage(botResponse);
        })
        .catch(err => console.log("Error al obtener respuesta de la colección 'funcionamientoApp'", err));

    } else {
      botResponse = "Lo siento, no tengo información sobre ese tema. ¿Puedes hacer otra pregunta?";
      addBotMessage(botResponse);
    }
  } else {
    // Si no es una pregunta, el bot recuerda que solo responde preguntas
    addBotMessage("Por favor, hazme una pregunta para poder ayudarte.");
  }

  
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
});

historyButton.addEventListener('click', function() {
  let historyText = "<h3>Historial de Mensajes:</h3>";
  history.forEach(item => {
    historyText += `<p><strong>${item.type.toUpperCase()}:</strong> ${item.message}</p>`;
  });
  alert(historyText);
});
