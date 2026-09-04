const http = require('http');
const WebSocket = require('ws');

// A simple health‑check endpoint
const healthServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  } else {
    res.writeHead(404);
    res.end();
  }
});
healthServer.listen(3000); // health endpoint

// WebSocket server on the same port (HTTP upgrade)
const wss = new WebSocket.Server({ server: healthServer });

wss.on('connection', (ws) => {
  console.log('WS client connected');

  ws.on('message', (msg) => {
    console.log('received:', msg);
    ws.send(`Echo: ${msg}`); // echo back
  });

  ws.on('close', () => console.log('WS client disconnected'));
});

console.log('WebSocket server listening on port 3000');

