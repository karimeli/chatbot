const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatboxBody = document.getElementById('chatbox-body');

async function getResponse(question) {
    const response = await fetch(`/ask?question=${encodeURIComponent(question)}`);
    const data = await response.json();
    return data.answer;
}

sendBtn.addEventListener('click', async () => {
    const question = chatInput.value.trim();
    if (question) {
        // Mostrar la pregunta del usuario
        chatboxBody.innerHTML += `<div class="message user"><p>${question}</p></div>`;
        chatInput.value = ''; // Limpiar campo de entrada

        // Obtener respuesta del servidor
        const answer = await getResponse(question);
        
        // Mostrar la respuesta
        chatboxBody.innerHTML += `<div class="message bot"><p>${answer}</p></div>`;
    }
});
