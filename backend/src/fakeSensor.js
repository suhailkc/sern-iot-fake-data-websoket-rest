import { saveSensorReading } from './db/sensorRepository.js';

function generateSensorData() {
  return {
    deviceId: 'DEVICE_001',
    temperature: Number((20 + Math.random() * 20).toFixed(1)), // 20–40
    humidity: Number((30 + Math.random() * 60).toFixed(1)),    // 30–90
  };
}

export function startFakeSensor() {
  setInterval(async () => {
    try {
      const data = generateSensorData();

      // Save the sensor reading to the database
      await saveSensorReading(data);

      console.log(`data saved: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('Error saving sensor reading:', error);
    }
  }, 3000);
}