export const getLatestSensorData = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sensors/latest`);
  return response.json();
};

export const getSensorHistory = async (limit = 30) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sensors/history?limit=${limit}`);
  return response.json();
};