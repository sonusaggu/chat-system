// api/websocket.js
const WebSocket = require('ws');

module.exports = (req, res) => {
  // Create WebSocket server on the HTTP request.
  const wss = new WebSocket.Server({ noServer: true });

  // Handle incoming WebSocket connections
  wss.on('connection', (ws) => {
    console.log('A user connected');
    
    // Listen for messages
    ws.on('message', (message) => {
      console.log('Received:', message);
      ws.send('Message received: ' + message);  // Echo back the message
    });

    // Handle disconnection
    ws.on('close', () => {
      console.log('A user disconnected');
    });
  });

  // Upgrade HTTP request to WebSocket
  res.socket.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  // Respond with a status
  res.status(200).send('WebSocket connected');
};
