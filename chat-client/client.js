const WebSocket = require('ws');

const endpoint = process.env.ENDPOINT || 'ws1.mindbodyengineer.com';
const ws = new WebSocket(`wss://${endpoint}/ws/`);

ws.on('open', () => {
  console.log('WebSocket connection opened');
  ws.send('Hello from client');
});

ws.on('message', (message) => {
  console.log('Received:', message);
});

ws.on('error', (err) => console.error('WebSocket error:', err));

ws.on('close', () => console.log('Connection closed'));
