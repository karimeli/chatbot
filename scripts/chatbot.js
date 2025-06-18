// Get the necessary elements from the DOM
const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBoxBody = document.getElementById('chatbox-body');

// Function to add the user's message to the chatbox
function addUserMessage(message) {
  const userMessageElement = document.createElement('div');
  userMessageElement.classList.add('message', 'user');
  userMessageElement.innerHTML = `<p>${message}</p>`;
  chatBoxBody.appendChild(userMessageElement);
}

// Function to add the bot's message to the chatbox
function addBotMessage() {
  const botMessageElement = document.createElement('div');
  botMessageElement.classList.add('message', 'bot');
  botMessageElement.innerHTML = `<p>Thanks for your message! How else can I help you?</p>`;
  chatBoxBody.appendChild(botMessageElement);
}

// Event listener for the "Send" button
sendButton.addEventListener('click', function() {
  const userMessage = chatInput.value;

  // Check if the input is not empty
  if (userMessage.trim() === '') return;

  // Add the user's message
  addUserMessage(userMessage);

  // Clear the input field
  chatInput.value = '';

  // Add a bot's response
  addBotMessage();

  // Scroll to the latest message
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
});
