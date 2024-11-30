const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

let canvasState = []; // Holds all drawing events

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Send the current canvas state
    socket.emit('canvasState', canvasState);

    // Handle drawing events
    socket.on('drawing', (data) => {
        canvasState.push(data); // Save to canvas state
        socket.broadcast.emit('drawing', data); // Broadcast to others
    });

    // Handle clear canvas event
    socket.on('clearCanvas', () => {
        canvasState = []; // Reset canvas state
        io.emit('clearCanvas'); // Broadcast clear event to all clients
    });

    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
