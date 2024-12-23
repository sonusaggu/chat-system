// chat.js
const socket = io(); // Connect to the WebSocket server

// DOM elements
const messagesDiv = document.getElementById('messages');
const chatbox = document.getElementById('chatbox');
const sendButton = document.getElementById('send');

// Send message on button click
sendButton.addEventListener('click', () => {
  const message = chatbox.value;
  if (message.trim()) {
    socket.emit('message', message); // Send message to the server
    chatbox.value = ''; // Clear the input field
  }
});

// Listen for incoming messages
socket.on('message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
});
