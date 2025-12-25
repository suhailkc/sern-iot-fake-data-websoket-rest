import LiveSensorChart from "../components/LiveSensorChart";
import { useEffect, useState } from "react";
import { socket } from "../services/socketService";
import { getSensorHistory } from "../services/sensorApi";

const Dashboard = () => {
  const [dataLimit, setDataLimit] = useState(5);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getSensorHistory(dataLimit).then((data: any) => {
      setData(data);
    });
  }, [dataLimit]);

  useEffect(() => {
    const handleSensorData = (NewData: any) => {
      setData((prev) => {
        const updatedData = [...prev, NewData];
        return updatedData.slice(-dataLimit); // Keep only last dataLimit data points
      });
    };

    socket.on('sensor-data', handleSensorData);

    return () => {
      socket.off('sensor-data', handleSensorData);
    };
  }, [dataLimit]);

  return (
    <div className="flex flex-col items-center justify-center">
      
      <LiveSensorChart data={data} />

      <div className="flex flex-row gap-2 items-center">
        <label htmlFor="dataLimit" className="text-sm text-gray-500">Data Limit: </label>
        <input id="dataLimit" type="number" value={dataLimit} onChange={e => setDataLimit(Number(e.target.value))} className="px-2 rounded-md border border-gray-300" />
      </div>

    </div>
  )
}

export default Dashboard