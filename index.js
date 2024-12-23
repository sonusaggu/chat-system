// index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from 'public' directory
app.use(express.static('public'));

// When a user connects
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages and broadcast them
  socket.on('message', (data) => {
    console.log('Message received:', data);
    socket.broadcast.emit('message', data); // Broadcast message to the other user
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Set the server to listen on port 3000 (Vercel uses its own port in production)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
