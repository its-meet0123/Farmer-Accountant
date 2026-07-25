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
        <div
          style={{
            width: chartWidth,
            height: 500,
            padding: 20,
            borderRadius: 20,
            background:
              "linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
            border: "1px solid rgba(255,255,255,.08)",
          }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={turnover}
              width={"100%"}
              height={"100%"}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid
                stroke="rgba(255,255,255,.08)"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#CBD5E1",
                  fontSize: 13,
                  fontWeight: 600,
                }}
                tickLine={false}
                axisLine={{
                  stroke: "rgba(255,255,255,.15)",
                }}
              />

              <YAxis
                domain={["auto", "auto"]}
                tick={{
                  fill: "#CBD5E1",
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={{
                  stroke: "rgba(255,255,255,.15)",
                }}
                tickFormatter={(value) => formatCurrency(value)}
              />

              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,.96)",
                  border: "1px solid rgba(59,130,246,.35)",
                  borderRadius: "16px",
                  color: "#fff",
                  boxShadow: "0 15px 35px rgba(0,0,0,.45)",
                }}
                cursor={{
                  stroke: "#3B82F6",
                  strokeWidth: 1,
                  strokeDasharray: "5 5",
                }}
                labelStyle={{
                  color: "#fff",
                  fontWeight: 700,
                }}
                formatter={(value) => [formatCurrency(value), "Turnover"]}
              />
              <Legend
                wrapperStyle={{
                  color: "#fff",
                  paddingTop: 20,
                  fontWeight: 600,
                }}
              />

              <ReferenceLine
                y={0}
                stroke="rgba(255,255,255,.35)"
                strokeDasharray="5 5"
                label={{
                  value: "Break Even",
                  fill: "#94A3B8",
                  fontSize: 12,
                }}
              />

              <Line
                type="monotone"
                dataKey="grandTotal"
                name="Monthly Turnover"
                stroke="#3B82F6"
                strokeWidth={4}
                dot={{
                  r: 6,
                  fill: "#3B82F6",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 9,
                  fill: "#06B6D4",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default TurnoverGraph;
