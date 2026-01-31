import { WarningOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const AlertText = ({ text }) => {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1
        style={{
          color: "#FFC000",
          fontSize: "36px",
          fontWeight: "700",
          margin: 0,
          letterSpacing: "2px",
          opacity: isVisible ? 1 : 0,
          textShadow: "2px 2px 10px rgba((255,204,0, 0.4)",
          transition: "opacity 0.1s ease-in-out",
          textTransform: "uppercase",
        }}>
        <WarningOutlined /> WARNING
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: "#222",
          fontWeight: "bold",
          lineHeight: "1.5",
        }}>
        {text}
      </p>
    </div>
  );
};

export default AlertText;
