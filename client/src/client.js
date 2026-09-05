const log = document.getElementById('log');
const socketUrl = `ws://${location.hostname}:${location.port}`; // or 10000
const socket = new WebSocket(socketUrl);

socket.addEventListener('open', () => {
  log.textContent += '⚙️  Connected\n';
  socket.send('Hello from client!');
});

socket.addEventListener('message', (e) => {
  log.textContent += `📨  Received: ${e.data}\n`;
});

socket.addEventListener('close', () => {
  log.textContent += '❌  Connection closed\n';
});

socket.addEventListener('error', (e) => {
  console.error(e);
  log.textContent += `❌  Error: ${e.message}\n`;
});

