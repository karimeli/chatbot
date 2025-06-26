// Elementos del DOM
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatboxBody = document.getElementById('chatbox-body');
const historyContainer = document.getElementById('history-container');
const historyBtn = document.getElementById('history-btn');
const hideHistoryBtn = document.getElementById('hide-history-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');

// Función para enviar mensaje
async function sendMessage() {
  const userMessage = chatInput.value.trim();

  if (userMessage === "") return;

  // Mostrar el mensaje del usuario en el chat
  chatboxBody.innerHTML += `<div class="message user"><p>${userMessage}</p></div>`;
  chatInput.value = ''; // Limpiar el campo de entrada

  // Agregar el mensaje al historial
  addMessageToHistory('Tú: ' + userMessage);

  // Enviar al backend para obtener respuesta
  const response = await getResponseFromBackend(userMessage);

  // Mostrar el mensaje del bot
  chatboxBody.innerHTML += `<div class="message bot"><p>${response}</p></div>`;

  // Agregar la respuesta del bot al historial
  addMessageToHistory('Bot: ' + response);

  // Mantener el scroll al final
  chatboxBody.scrollTop = chatboxBody.scrollHeight;
}

// Función para obtener la respuesta del backend
async function getResponseFromBackend(message) {
  try {
    const response = await fetch('http://localhost:3001/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: message })
    });

    const data = await response.json();

    return data.answer; // Retornar la respuesta del chatbot
  } catch (error) {
    return "Lo siento, algo salió mal. Intenta nuevamente.";
  }
}

// Función para agregar mensaje al historial
function addMessageToHistory(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  historyContainer.appendChild(messageElement);
}

// Botón para mostrar el historial
historyBtn.addEventListener('click', () => {
  historyContainer.style.display = 'block';
  hideHistoryBtn.style.display = 'inline-block';
  historyBtn.style.display = 'none';
});

// Botón para ocultar el historial
hideHistoryBtn.addEventListener('click', () => {
  historyContainer.style.display = 'none';
  hideHistoryBtn.style.display = 'none';
  historyBtn.style.display = 'inline-block';
});

// Botón para limpiar el historial
clearHistoryBtn.addEventListener('click', () => {
  historyContainer.innerHTML = '<h3>Historial de Conversación</h3>';
});

// Evento de enviar mensaje al hacer clic en el botón "Enviar"
sendBtn.addEventListener('click', sendMessage);

// Evento de enviar mensaje al presionar Enter
chatInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
