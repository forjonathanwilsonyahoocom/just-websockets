const WebSocket = require('ws');
const http = require('http');

// HTTP health‑check (optional, harmless)
const httpServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  }
});
httpServer.listen(8081);

// WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
const connections = []; // track all connected clients

wss.on('connection', (ws) => {
  console.log('Client connected');
  connections.push(ws);

  ws.on('message', (message) => {
    const text = typeof message === 'string' ? message : message.toString();
    console.log('Broadcasting:', text);

    // Send to every *other* client
    connections
      .filter((c) => c !== ws && c.readyState === WebSocket.OPEN)
      .forEach((c) => c.send(text));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    const idx = connections.indexOf(ws);
    if (idx !== -1) connections.splice(idx, 1);
  });

  ws.on('error', (err) => console.error('WebSocket error:', err));
});

console.log('WebSocket server listening on port 8080');