import { getLatestSensorReading } from '../db/sensorRepository.js';

// Store the last fetched timestamp to track new readings
let lastFetchedTimestamp = null;

/**
 * Fetch and emit latest sensor data to all connected clients
 * @param {Object} io - Socket.IO server instance
 * @param {boolean} forceEmit - If true, emit even if data hasn't changed
 */
export async function fetchAndEmitSensorData(io, forceEmit = false) {
    try {
        const latestReading = await getLatestSensorReading();
        
        if (latestReading) {
            // Check if this is new data (different timestamp) or if we should force emit
            const isNewData = lastFetchedTimestamp === null || 
                             latestReading.created_at !== lastFetchedTimestamp;
            
            if (isNewData || forceEmit) {
                // Format the data for the frontend
                const formattedData = {
                    deviceId: latestReading.device_id,
                    temperature: latestReading.temperature,
                    humidity: latestReading.humidity,
                    timestamp: latestReading.created_at,
                    time: new Date(latestReading.created_at).toLocaleTimeString()
                };

                // Emit to all connected clients
                io.emit('sensor-data', formattedData);
                
                // Update the last fetched timestamp
                lastFetchedTimestamp = latestReading.created_at;
                
                console.log(`Emitted sensor data: ${JSON.stringify(formattedData)}`);
            }
        }
    } catch (error) {
        console.error('Error fetching and emitting sensor data:', error);
    }
}

