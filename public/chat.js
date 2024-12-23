// chat.js
const socket = new WebSocket('wss://chat-system-f1fd1a.fly.dev/api/websocket');
 // Make sure this URL is correct

// DOM elements
const messagesDiv = document.getElementById('messages');
const chatbox = document.getElementById('chatbox');
const sendButton = document.getElementById('send');

// Send message on button click
sendButton.addEventListener('click', () => {
  const message = chatbox.value;
  if (message.trim()) {
    socket.send(message);  // Send message to WebSocket server
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
