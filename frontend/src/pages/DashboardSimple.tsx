import LiveSensorChart from "../components/LiveSensorChart";
import { useEffect, useState } from "react";
import { socket } from "../services/socketService";
import { getSensorHistory } from "../services/sensorApi";

const DashboardSimple = () => {
  const DATA_LIMIT = 10;
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getSensorHistory(DATA_LIMIT).then((data: any) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    const handleSensorData = (NewData: any) => {
      setData((prev) => {
        const updatedData = [...prev, NewData];
        return updatedData.slice(-DATA_LIMIT); // Keep only last DATA_LIMIT data points
      });
    };

    socket.on('sensor-data', handleSensorData);

    return () => {
      socket.off('sensor-data', handleSensorData);
    };
  }, []);

  return <LiveSensorChart data={data} />
}

export default DashboardSimple