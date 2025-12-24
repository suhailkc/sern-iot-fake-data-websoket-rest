import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function LiveSensorChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="temperature"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
