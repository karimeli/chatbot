
const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBoxBody = document.getElementById('chatbox-body');


function addUserMessage(message) {
  const userMessageElement = document.createElement('div');
  userMessageElement.classList.add('message', 'user');
  userMessageElement.innerHTML = `<p>${message}</p>`;
  chatBoxBody.appendChild(userMessageElement);
}


function addBotMessage() {
  const botMessageElement = document.createElement('div');
  botMessageElement.classList.add('message', 'bot');
  botMessageElement.innerHTML = `<p>Thanks for your message! How else can I help you?</p>`;
  chatBoxBody.appendChild(botMessageElement);
}

sendButton.addEventListener('click', function() {
  const userMessage = chatInput.value;

  if (userMessage.trim() === '') return;

  
  addUserMessage(userMessage);

 
  chatInput.value = '';


  addBotMessage();

 
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
});
