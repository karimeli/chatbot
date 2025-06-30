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
  botMessageElement.innerHTML = `<p>${responseText}</p>`;
  chatBoxBody.appendChild(botMessageElement);

  history.push({ type: 'bot', message: responseText });
  scrollToBottom();  
}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}

sendButton.addEventListener('click', async function() {
  const userMessage = chatInput.value;

  if (userMessage.trim() === '') return;

  // Limpiar el chat antes de agregar el nuevo mensaje
  chatBoxBody.innerHTML = ''; 

  addUserMessage(userMessage);

  chatInput.value = '';

  if (userMessage.trim().endsWith('?')) {
    let botResponse = "";

    try {
      const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: userMessage })
      });

      const data = await response.json();
      botResponse = data.respuesta || "Lo siento, no entendí la pregunta.";
      addBotMessage(botResponse);

    } catch (err) {
      console.error("Error al obtener la respuesta:", err);
      addBotMessage("Hubo un error al procesar tu solicitud.");
    }
  } else {
    addBotMessage("Por favor, hazme una pregunta para poder ayudarte.");
  }

  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
});

historyButton.addEventListener('click', function() {
  historyContainer.innerHTML = "<h3>Historial de Mensajes:</h3>";  

  history.forEach(item => {
    historyContainer.innerHTML += `<p><strong>${item.type.toUpperCase()}:</strong> ${item.message}</p>`;
  });

  historyContainer.style.display = 'block';  
  historyButton.style.display = 'none';  
  hideHistoryButton.style.display = 'inline'; 
  clearHistoryButton.style.display = 'inline'; 
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
