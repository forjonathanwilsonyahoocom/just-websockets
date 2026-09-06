// client.js

// Use native WebSocket in browsers
const endpoint = 'ws1.mindbodyengineer.com';
const ws = new WebSocket(`wss://${endpoint}/ws/`);

// Expose WebSocket instance globally for index.html script
window.ws = ws;

ws.onopen = () => console.log('WebSocket connection opened');
ws.onmessage = (msg) => console.log('Received:', msg.data);
ws.onerror = (err) => console.error('WebSocket error:', err);
ws.onclose = () => console.log('Connection closed');

// UI helpers – these functions are executed in the browser environment
function sendMessage() {
  const input = document.getElementById('msgInput');
  if (input && input.value.trim() !== '') {
    const msg = input.value.trim();
    ws.send(msg);
    console.log('Sent:', msg);
    input.value = '';
  }
}

// Attach click handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('sendBtn');
  if (btn) btn.addEventListener('click', sendMessage);
});