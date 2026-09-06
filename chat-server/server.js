const WebSocket = require('ws');
const http = require('http');

// HTTP health‑check (optional, not required for the prompt but harmless)
const httpServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  }
});
httpServer.listen(8081);

// WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Convert Buffer → string if necessary
    const text = typeof message === 'string' ? message : message.toString();
    console.log('Received:', text);
    ws.send(text); // always send plain text
  });

  ws.on('close', () => console.log('Client disconnected'));
  ws.on('error', (err) => console.error('WebSocket error:', err));
});

console.log('WebSocket server listening on port 8080');