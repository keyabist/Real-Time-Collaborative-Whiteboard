import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Canvas.css';

const Canvas = () => {
    const canvasRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:3001', {
            withCredentials: true,
            transports: ['websocket'],
            reconnectionAttempts: 5,
        });

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Handle initial canvas state
        socketRef.current.on('canvasState', (state) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing
            state.forEach((data) => {
                drawLine(data.x0, data.y0, data.x1, data.y1, data.color, false);
            });
        });

        // Handle real-time drawing events
        socketRef.current.on('drawing', (data) => {
            drawLine(data.x0, data.y0, data.x1, data.y1, data.color, false);
        });

        // Handle clear canvas event
        socketRef.current.on('clearCanvas', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear locally
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const drawLine = (x0, y0, x1, y1, color = 'black', emit = true) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        if (emit) {
            socketRef.current.emit('drawing', { x0, y0, x1, y1, color });
        }
    };

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        canvas.isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        canvas.lastX = e.clientX - rect.left;
        canvas.lastY = e.clientY - rect.top;
    };

    const handleMouseUp = () => {
        canvasRef.current.isDrawing = false;
    };

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas.isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        drawLine(canvas.lastX, canvas.lastY, x, y);
        canvas.lastX = x;
        canvas.lastY = y;
    };

    // Function to clear the canvas and notify the server
    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear locally
        socketRef.current.emit('clearCanvas'); // Notify server
    };

    return (
        <div className="whiteboard-container">
            <h1>Real-Time Whiteboard</h1>
            <div className="canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseOut={handleMouseUp}
                    onMouseMove={handleMouseMove}
                />
            </div>
            <button onClick={clearCanvas} className="clear-btn">
                Clear Canvas
            </button>
        </div>
    );
};

export default Canvas;
