// api/websocket.js
const WebSocket = require('ws');

module.exports = (req, res) => {
  // Upgrade the incoming HTTP request to WebSocket
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('A user connected');
    
    // Handle incoming messages
    ws.on('message', (message) => {
      console.log('Received:', message);
      ws.send('Message received: ' + message);  // Echo message back
    });

    // Handle disconnections
    ws.on('close', () => {
      console.log('A user disconnected');
    });
  });

  // This is where the WebSocket upgrade happens
  res.socket.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  // Respond with a simple HTTP response for non-WebSocket requests
  res.status(200).send('WebSocket server initialized');
};
