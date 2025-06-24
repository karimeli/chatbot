const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBoxBody = document.getElementById('chatbox-body');
const historyButton = document.getElementById('history-btn');
const hideHistoryButton = document.getElementById('hide-history-btn');
const clearHistoryButton = document.getElementById('clear-history-btn');
const historyContainer = document.getElementById('history-container');
let history = [];

function addUserMessage(message) {
  const userMessageElement = document.createElement('div');
  userMessageElement.classList.add('message', 'user');
  userMessageElement.innerHTML = `<p>${message}</p>`;
  chatBoxBody.appendChild(userMessageElement);

  history.push({ type: 'user', message: message });
  scrollToBottom();  
}

function addBotMessage(responseText) {
  const botMessageElement = document.createElement('div');
  botMessageElement.classList.add('message', 'bot');
  
  let botResponse = responseText || "Gracias por tu mensaje! ¿Cómo más puedo ayudarte?";

  botMessageElement.innerHTML = `<p>${botResponse}</p>`;
  chatBoxBody.appendChild(botMessageElement);

  history.push({ type: 'bot', message: botResponse });
  scrollToBottom();  
}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}

sendButton.addEventListener('click', function() {
  const userMessage = chatInput.value;

  if (userMessage.trim() === '') return;

  clearChat();

  addUserMessage(userMessage);

  chatInput.value = '';

  const userInput = userMessage.trim();

  if (userInput) {
    let botResponse = "";

    // Verificar si la pregunta tiene alguna de las categorías relevantes
    if (userInput.toLowerCase().includes("expresiones")) {
      // Buscar la pregunta relacionada en la base de datos usando índice de texto
      fetch(`http://localhost:3001/expresiones?pregunta=${encodeURIComponent(userInput)}`)
        .then(response => response.json())
        .then(data => {
          console.log('Datos recibidos de la API de expresiones:', data); // Log de depuración
          if (data.respuesta) {
            botResponse = data.respuesta;
            addBotMessage(botResponse);
          } else {
            botResponse = "Lo siento, no tengo información sobre ese tema. ¿Puedes hacer otra pregunta?";
            addBotMessage(botResponse);
          }
        })
        .catch(err => {
          console.error("Error al obtener datos de Expresiones:", err);
          addBotMessage("Hubo un problema al obtener la información.");
        });

    } else if (userInput.toLowerCase().includes("historia")) {
      // Buscar la pregunta relacionada en la base de datos usando índice de texto
      fetch(`http://localhost:3001/historia?pregunta=${encodeURIComponent(userInput)}`)
        .then(response => response.json())
        .then(data => {
          console.log('Datos recibidos de la API de historia:', data); // Log de depuración
          if (data.respuesta) {
            botResponse = data.respuesta;
            addBotMessage(botResponse);
          } else {
            botResponse = "Lo siento, no tengo información sobre ese tema. ¿Puedes hacer otra pregunta?";
            addBotMessage(botResponse);
          }
        })
        .catch(err => {
          console.error("Error al obtener datos de Historia:", err);
          addBotMessage("Hubo un problema al obtener la información.");
        });

    } else if (userInput.toLowerCase().includes("funcionamiento de la app")) {
      // Buscar la pregunta relacionada en la base de datos usando índice de texto
      fetch(`http://localhost:3001/funcionamientoApp?pregunta=${encodeURIComponent(userInput)}`)
        .then(response => response.json())
        .then(data => {
          console.log('Datos recibidos de la API de funcionamientoApp:', data); // Log de depuración
          if (data.respuesta) {
            botResponse = data.respuesta;
            addBotMessage(botResponse);
          } else {
            botResponse = "Lo siento, no tengo información sobre ese tema. ¿Puedes hacer otra pregunta?";
            addBotMessage(botResponse);
          }
        })
        .catch(err => {
          console.error("Error al obtener datos de FuncionamientoApp:", err);
          addBotMessage("Hubo un problema al obtener la información.");
        });

    } else {
      botResponse = "Lo siento, no tengo información sobre ese tema. ¿Puedes hacer otra pregunta?";
      addBotMessage(botResponse);
    }
  } else {
    addBotMessage("Por favor, hazme una pregunta para poder ayudarte.");
  }

  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
});

function clearChat() {
  chatBoxBody.innerHTML = '';
}

historyButton.addEventListener('click', function() {
  historyContainer.style.display = 'block';  
  historyButton.style.display = 'none'; 
  hideHistoryButton.style.display = 'inline';  
  clearHistoryButton.style.display = 'inline'; 

  historyContainer.innerHTML = "<h3>Historial de Mensajes:</h3>"; 

  history.forEach(item => {
    historyContainer.innerHTML += `<p><strong>${item.type.toUpperCase()}:</strong> ${item.message}</p>`;
  });
});

hideHistoryButton.addEventListener('click', function() {
  historyContainer.style.display = 'none';  
  hideHistoryButton.style.display = 'none'; 
  historyButton.style.display = 'inline';  
  clearHistoryButton.style.display = 'none'; 
});

clearHistoryButton.addEventListener('click', function() {
  history = [];  
  historyContainer.innerHTML = "<h3>Historial de Mensajes:</h3>";  
});
