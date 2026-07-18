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

const TurnoverGraph = ({ turnover }) => {
  if (!turnover || turnover.length === 0) return null;

  const chartWidth = Math.max(500, turnover.length * 100);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <div style={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ width: chartWidth, height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={turnover}
              width={"100%"}
              height={"100%"}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="month"
                tick={{ fill: "#ffffff" }}
                axisLine={{ stroke: "#ffffff" }}
              />

              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: "#ffffff" }}
                axisLine={{ stroke: "#ffffff" }}
                tickFormatter={formatCurrency}
              />

              <Tooltip
                labelStyle={{ color: "#000" }}
                formatter={(value) => {
                  formatCurrency(value);
                }}
              />
              <Legend />

              <ReferenceLine
                y={0}
                stroke="#ffffff"
                strokeWidth={1}
                label="Zero"
              />

              <Line
                type="monotone"
                dataKey="grandTotal"
                stroke="#1890ff"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default TurnoverGraph;
