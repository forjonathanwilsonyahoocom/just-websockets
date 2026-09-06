const endpoint = "ws1.mindbodyengineer.com";
const ws = new WebSocket(`wss://${endpoint}/ws/`);

ws.onopen = () => {
  console.log('WebSocket connection opened');
  ws.send('Hello from browser');
};

ws.onmessage = (event) => {
  const data = event.data;
  if (data instanceof Blob) {
    // Convert Blob → text before logging
    data.text().then((text) => console.log('Received:', text));
  } else {
    console.log('Received:', data);
  }
};

ws.onerror = (err) => console.error('WebSocket error:', err);

ws.onclose = () => console.log('WebSocket connection closed');