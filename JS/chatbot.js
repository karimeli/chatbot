// Obtener elementos del DOM
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatboxBody = document.getElementById('chatbox-body');
const historyContainer = document.getElementById('history-container');
const historyBtn = document.getElementById('history-btn');
const hideHistoryBtn = document.getElementById('hide-history-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');

let history = [];  // Para almacenar el historial de la conversación

// Función para mostrar el historial
function showHistory() {
  historyContainer.style.display = 'block';
  hideHistoryBtn.style.display = 'inline-block';
  clearHistoryBtn.style.display = 'inline-block';
  historyContainer.innerHTML = '<h3>Historial de Conversación</h3>';
  history.forEach((message) => {
    historyContainer.innerHTML += `<p><strong>${message.user ? 'Tú' : 'Bot'}:</strong> ${message.text}</p>`;
  });
}

// Función para ocultar el historial
function hideHistory() {
  historyContainer.style.display = 'none';
  hideHistoryBtn.style.display = 'none';
  clearHistoryBtn.style.display = 'none';
}

// Función para limpiar el historial
function clearHistory() {
  history = [];
  historyContainer.innerHTML = '<h3>Historial de Conversación</h3>';
}

// Función para enviar un mensaje
function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (userMessage) {
    // Mostrar el mensaje del usuario
    addMessage(userMessage, true);

    // Llamada al servidor para obtener la respuesta del bot
    fetch('http://localhost:54112/pregunta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pregunta: userMessage })
    })
      .then(response => response.json())
      .then(data => {
        const botResponse = data.respuesta;
        addMessage(botResponse, false);
      })
      .catch(err => {
        console.error('Error:', err);
      });

    // Limpiar el campo de entrada
    chatInput.value = '';
  }
}

// Función para agregar un mensaje al chat
function addMessage(message, isUser) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user' : 'bot');
  messageDiv.innerHTML = `<p>${message}</p>`;
  chatboxBody.appendChild(messageDiv);
  chatboxBody.scrollTop = chatboxBody.scrollHeight;  // Scroll automático
  history.push({ text: message, user: isUser });
}

// Evento para enviar el mensaje cuando se presiona el botón
sendBtn.addEventListener('click', sendMessage);

// Evento para enviar el mensaje cuando se presiona "Enter"
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Mostrar historial de conversación
historyBtn.addEventListener('click', showHistory);

// Ocultar historial de conversación
hideHistoryBtn.addEventListener('click', hideHistory);

// Limpiar historial de conversación
clearHistoryBtn.addEventListener('click', clearHistory);

// Inicializar el chatbot con un mensaje de bienvenida
addMessage('¿En qué puedo ayudarte?', false);
