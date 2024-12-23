// chat.js (Client-side)
const socket = new WebSocket('wss://your-vercel-deployment-url/api/websocket');

// DOM elements
const messagesDiv = document.getElementById('messages');
const chatbox = document.getElementById('chatbox');
const sendButton = document.getElementById('send');

// Send message on button click
sendButton.addEventListener('click', () => {
  const message = chatbox.value;
  if (message.trim()) {
    socket.send(message);  // Send message to the WebSocket server
    chatbox.value = ''; // Clear the input field
  }
});

// Listen for incoming messages
socket.onmessage = (event) => {
  const message = event.data;
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
};
