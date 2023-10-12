// JavaScript code for chatbot functionality
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const promptButtonsContainer = document.createElement('div');
promptButtonsContainer.className = 'prompt-buttons';

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter'){
    sendMessage();
  }
});

// Add event listener to handle prompt button clicks
promptButtonsContainer.addEventListener('click', (event) => {
  const message = event.target.getAttribute('data-message');
  if (message) {
    displayMessage(message, 'user');
    sendBotMessage(message);
  }
});

// Append prompt buttons container to the chat container
document.querySelector('.chat-container').appendChild(promptButtonsContainer);

function sendMessage() {
  const message = userInput.value.trim();
  if (message !== '') {
    displayMessage(message, 'user');
    sendBotMessage(message);
    userInput.value = '';
  }
}

function sendBotMessage(message) {
  // Make an API call to your Django backend to get the bot response
  // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your Django API endpoint
  fetch('YOUR_BACKEND_API_URL', {
    method: 'POST',
    body: JSON.stringify({ message: message }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    const response = data.response;
    displayMessage(response, 'chatbot');
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function displayMessage(message, sender) {
  const messageContainer = document.createElement('div');
  messageContainer.className = `message ${sender}`;
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.textContent = message;
  messageContainer.appendChild(messageContent);
  chatMessages.appendChild(messageContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to add prompt buttons dynamically
function addPromptButtons(buttons) {
  promptButtonsContainer.innerHTML = '';
  buttons.forEach((button) => {
    const promptButton = document.createElement('button');
    promptButton.setAttribute('data-message', button.message);
    promptButton.textContent = button.label;
    promptButtonsContainer.appendChild(promptButton);
  });
}

// Fetch prompt buttons data from the Django backend API
// Replace 'YOUR_BACKEND_API_URL' with the actual URL of your Django API endpoint
fetch('YOUR_BACKEND_API_URL')
  .then(response => response.json())
  .then(data => {
    const promptButtons = data.promptButtons;
    addPromptButtons(promptButtons);
  })
  .catch(error => {
    console.error('Error:', error);
  });
