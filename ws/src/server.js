import WebSocket, { WebSocketServer } from 'ws';

const port = Number(process.env.WS_PORT || 10000);
const server = new WebSocketServer({ host: '0.0.0.0', port });

server.on('listening', () => {
  console.log(`WebSocket server listening on port ${port}`);
});

server.on('connection', (socket, request) => {
  console.log(`Client connected from ${request.socket.remoteAddress}`);
  socket.send('hello from websocket');

  socket.on('message', (msg) => {
    const text = msg.toString();
    console.log('Received:', text);
    socket.send(text); // echo
  });

  socket.on('close', () => console.log('Client disconnected'));
  socket.on('error', (err) => console.error('WebSocket error:', err.message));
});

