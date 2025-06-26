const sendBtn = document.getElementById('send-btn');
const chatBoxBody = document.getElementById('chatbox-body');
const questionSelect = document.getElementById('question-select');

// Cargar preguntas desde el servidor
fetch('/api/get-questions')
  .then(response => response.json())
  .then(data => {
    const questions = data.questions;
    questions.forEach(question => {
      const option = document.createElement('option');
      option.value = question._id;
      option.textContent = question.pregunta;
      questionSelect.appendChild(option);
    });
  });

// Manejar el evento de click en el botón "Enviar"
sendBtn.addEventListener('click', () => {
  const selectedQuestion = questionSelect.value;
  if (selectedQuestion) {
    fetch(`/api/get-answer/${selectedQuestion}`)
      .then(response => response.json())
      .then(data => {
        const botMessage = `<div class="message bot"><p>${data.answer}</p></div>`;
        chatBoxBody.innerHTML += botMessage;
      });
  }
});
