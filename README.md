# IoT Sensor Monitoring System

A real-time IoT sensor monitoring application that simulates sensor data and displays it via WebSocket and REST API.

## Features

- **Fake Sensor Data Generator**: Automatically generates temperature and humidity readings every 3 seconds
- **Real-time Updates**: WebSocket (Socket.io) for live sensor data streaming
- **REST API**: Historical data endpoints for sensor readings
- **Interactive Dashboard**: React-based dashboard with live charts using Recharts
- **MySQL Database**: Persistent storage for sensor readings

## Tech Stack

### Backend
- Node.js with Express
- Socket.io for WebSocket communication
- MySQL2 for database operations
- CORS enabled for frontend communication

### Frontend
- React with TypeScript
- Vite for build tooling
- Recharts for data visualization
- Tailwind CSS for styling
- Socket.io Client for real-time updates

## Project Structure

```
├── backend/
│   └── src/
│       ├── db/              # Database connection and repository
│       ├── routes/           # REST API routes
│       ├── services/         # Socket service
│       ├── fakeSensor.js    # Fake sensor data generator
│       └── server.js         # Express server setup
└── frontend/
    └── src/
        ├── components/       # React components
        ├── pages/           # Dashboard pages
        └── services/        # API and socket services
```

## Setup

### Prerequisites
- Node.js (v18+)
- MySQL database

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your database configuration:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=5000
FRONTEND_URL=http://localhost:5173
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/sensors/latest` - Get the latest sensor reading
- `GET /api/sensors/history?limit=50` - Get recent sensor readings (default limit: 50)

## WebSocket Events

The server emits `sensor-data` events every 2 seconds with the latest sensor readings.

## License

ISC

