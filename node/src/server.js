import { WebSocketServer } from "ws";

const port = process.env.PORT || 3000;
const wss = new WebSocketServer({ port });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log("Received:", message.toString());
    socket.send(`Echo: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server listening on port ${port}`);
