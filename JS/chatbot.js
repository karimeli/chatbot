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
  scrollToBottom();  // Hacer scroll al último mensaje
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

  if (userMessage.trim().endsWith('?')) {
    let botResponse = "";

    if (userMessage.toLowerCase().includes("expresiones")) {
      fetch('http://localhost:3001/api/expresiones')
        .then(response => response.json())
        .then(data => {
          botResponse = data.descripcion;
          addBotMessage(botResponse);
        })
        .catch(err => console.error("Error al obtener datos de Expresiones:", err));

    } else if (userMessage.toLowerCase().includes("historia")) {
      fetch('http://localhost:3001/api/historia')
        .then(response => response.json())
        .then(data => {
          botResponse = data.descripcion;
          addBotMessage(botResponse);
        })
        .catch(err => console.error("Error al obtener datos de Historia:", err));

    } else if (userMessage.toLowerCase().includes("funcionamiento de la app")) {
      fetch('http://localhost:3001/api/funcionamientoApp')
        .then(response => response.json())
        .then(data => {
          botResponse = data.descripcion;
          addBotMessage(botResponse);
        })
        .catch(err => console.error("Error al obtener datos de FuncionamientoApp:", err));

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

  // Limpiar el contenido anterior del historial
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
