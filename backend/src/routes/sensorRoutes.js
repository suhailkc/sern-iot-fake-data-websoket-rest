import express from 'express';
import { getLatestSensorReading, getRecentSensorReadings } from '../db/sensorRepository.js';

const router = express.Router();

router.get('/latest', async (req, res) => {
  try {
    const latestReading = await getLatestSensorReading();
    
    if (latestReading) {
      const formattedData = {
        deviceId: latestReading.device_id,
        temperature: latestReading.temperature,
        humidity: latestReading.humidity,
        timestamp: latestReading.created_at,
        time: new Date(latestReading.created_at).toLocaleTimeString()
      };
      res.json(formattedData);
    } else {
      res.status(404).json({ message: 'No sensor readings found' });
    }
  } catch (error) {
    console.error('Error fetching latest reading:', error);
    res.status(500).json({ message: 'Failed to fetch latest reading' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;
    const history = await getRecentSensorReadings(limit);
    
    const formattedHistory = history.map(item => ({
      deviceId: item.device_id,
      temperature: item.temperature,
      humidity: item.humidity,
      timestamp: item.created_at,
      time: new Date(item.created_at).toLocaleTimeString()
    }));
    
    res.json(formattedHistory);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

export default router;