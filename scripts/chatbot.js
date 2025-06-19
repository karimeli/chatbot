const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBoxBody = document.getElementById('chatbox-body');
const signLanguageButton = document.getElementById('sign-language-btn');
let isSignLanguage = false;
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


function updateChatDisplay() {
  if (isSignLanguage) {
    signLanguageButton.innerHTML = "Desactivar Lenguaje de Señas";
  } else {
    signLanguageButton.innerHTML = "Activar Lenguaje de Señas";
  }
}


signLanguageButton.addEventListener('click', function() {
  isSignLanguage = !isSignLanguage;
  updateChatDisplay();
});

sendButton.addEventListener('click', function() {
  const userMessage = chatInput.value;

  if (userMessage.trim() === '') return;

  addUserMessage(userMessage);


  chatInput.value = '';

  
  if (userMessage.trim().endsWith('?')) {
 
    let botResponse = "";


    if (userMessage.toLowerCase().includes("funcionamiento del guante")) {
      botResponse = "El funcionamiento del guante implica el uso de sensores para detectar los movimientos de la mano y traducirlos en comandos o interacciones dentro de un sistema, como una aplicación o un dispositivo.";
    } else if (userMessage.toLowerCase().includes("soporte técnico")) {
      botResponse = "El soporte técnico se encarga de asistir a los usuarios con problemas relacionados con el funcionamiento de dispositivos o software, ofreciendo soluciones a través de guías, soluciones remotas o en persona.";
    } else if (userMessage.toLowerCase().includes("cómo se estructura una palabra")) {
      botResponse = "Una palabra se estructura en fonemas, que son las unidades de sonido, y a veces en morfemas, que son las unidades de significado. Estas unidades se combinan para formar palabras con significado y contexto.";
    } else {
      botResponse = "Lo siento, no tengo información sobre ese tema. ¿Puedes hacer otra pregunta?";
    }

    
    addBotMessage(botResponse);
  } else {
    addBotMessage("Por favor, hazme una pregunta para poder ayudarte.");
  }


  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
});


function showHistory() {
  const historyButton = document.getElementById('history-btn');
  historyButton.addEventListener('click', function() {
    let historyText = "<h3>Historial de Mensajes:</h3>";
    history.forEach(item => {
      historyText += `<p><strong>${item.type.toUpperCase()}:</strong> ${item.message}</p>`;
    });
    alert(historyText); 
  });
}


showHistory();
