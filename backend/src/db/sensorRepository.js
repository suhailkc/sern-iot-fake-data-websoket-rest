import { pool } from './index.js';

// Save a sensor reading to the database
export async function saveSensorReading(data) {
  const sql = `
    INSERT INTO sensor_readings (device_id, temperature, humidity) 
    VALUES (?, ?, ?)
  `;

  const values = [
    data.deviceId, 
    data.temperature, 
    data.humidity 
  ];

  await pool.execute(sql, values);
}

// Fetch the latest sensor reading from the database
export async function getLatestSensorReading() {
  const sql = `
    SELECT * FROM sensor_readings 
    ORDER BY created_at DESC 
    LIMIT 1
  `;
  
  const [rows] = await pool.execute(sql);
  return rows[0] || null;
}

// Fetch recent sensor readings (for history)
export async function getRecentSensorReadings(limit = 50) {
  const sql = `
    SELECT * FROM sensor_readings 
    ORDER BY created_at DESC 
    LIMIT ?
  `;
  
  const [rows] = await pool.execute(sql, [limit]);
  return rows.reverse(); // Return oldest to newest for chart display
}

// Fetch sensor readings since a specific timestamp
export async function getSensorReadingsSince(timestamp) {
  const sql = `
    SELECT * FROM sensor_readings 
    WHERE created_at > ?
    ORDER BY created_at ASC
  `;
  
  const [rows] = await pool.execute(sql, [timestamp]);
  return rows;
}