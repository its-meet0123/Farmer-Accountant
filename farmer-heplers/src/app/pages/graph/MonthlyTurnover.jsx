import { Card } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TurnoverGraph = ({ trunover }) => {
  console.log("monthly turnover component :", trunover);

  return (
    <>
      {trunover.length != 0 && (
        <Card title="Turnover Graph" style={{ width: "100%", height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trunover}
              width={"100%"}
              height={"100%"}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" />

              <YAxis
                domain={[-300000, 300000]}
                tickFormatter={(value) => `₹${value.toLocaleString()}`}
              />

              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />

              <ReferenceLine y={0} stroke="#000" strokeWidth={1} label="Zero" />

              <Line
                type="monotone"
                dataKey="grandTotal"
                stroke="#1890ff"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}
    </>
  );
};

export default TurnoverGraph;
