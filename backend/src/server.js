import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { startFakeSensor } from './fakeSensor.js';
import router from './routes/sensorRoutes.js';
import { fetchAndEmitSensorData } from './services/socketService.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});

// Set up polling interval to fetch data from database and emit via socket.io
const POLL_INTERVAL = 2000; // 2 seconds

setInterval(() => {
    fetchAndEmitSensorData(io);
}, POLL_INTERVAL);

io.on('connection', (socket) => {
    console.log('Client connected', socket.id);
    
    // Send initial data when client connects (force emit even if same as last)
    fetchAndEmitSensorData(io, true);
    
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
});

// Fake sensor data generator
startFakeSensor();

// REST API for historical data (better suited for request-response pattern)
app.use(cors());
app.use(express.json());
app.use('/api/sensors', router);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});