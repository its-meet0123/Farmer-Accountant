import React, { useState, useEffect } from "react";
import { Card, Progress, Typography, Space, Spin, Row, Col } from "antd";
import {
  LineChartOutlined,
  WalletOutlined,
  SafetyOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const FarmerLoader = ({ isLoading, user }) => {
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [show, setShow] = useState(true);

  const promoData = [
    {
      title: "सटीक डिजिटल डायरी",
      desc: "अब बीज से लेकर बाजार तक का हर हिसाब आपकी जेब में।",
      icon: (
        <LineChartOutlined style={{ fontSize: "42px", color: "#2ecc71" }} />
      ),
    },
    {
      title: "मजदूरी और खाद का हिसाब",
      desc: "लेबर और खाद के खर्चों को ट्रैक करें और फिजूलखर्ची रोकें।",
      icon: <WalletOutlined style={{ fontSize: "42px", color: "#3498db" }} />,
    },
    {
      title: "हार्वेस्टिंग ट्रैकर",
      desc: "फसल कटाई के समय का मैनेजमेंट अब और भी आसान।",
      icon: (
        <DashboardOutlined style={{ fontSize: "42px", color: "#f1c40f" }} />
      ),
    },
    {
      title: "सुरक्षित डेटा",
      desc: "आपका डेटा पूरी तरह एन्क्रिप्टेड और सुरक्षित है।",
      icon: <SafetyOutlined style={{ fontSize: "42px", color: "#e74c3c" }} />,
    },
  ];

  useEffect(() => {
    const promoInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promoData.length);
    }, 3000);
    return () => clearInterval(promoInterval);
  }, []);

  useEffect(() => {
    let progressTimer;

    if (!user) {
      progressTimer = setInterval(() => {
        setPercent((prev) => (prev < 95 ? prev + 1 : prev));
      }, 200);
    } else {
      setPercent(100);
      setTimeout(() => setShow(false), 500);
    }

    return () => clearInterval(progressTimer);
  }, [user]);

  if (!show && !isLoading) return null;

  return (
    <div style={overlayStyle}>
      <Row justify="center" align="middle" style={{ width: "100%" }}>
        <Col xs={22} sm={16} md={12} lg={8}>
          <Card
            bordered={false}
            style={cardStyle}
            bodyStyle={{ padding: "40px 24px" }}>
            <Space
              direction="vertical"
              size="large"
              style={{ width: "100%", textAlign: "center" }}>
              <Spin size="large" tip="लोड हो रहा है..." />

              <div
                style={{
                  minHeight: "180px",
                  transition: "all 0.5s ease-in-out",
                }}>
                <div style={{ marginBottom: "20px" }}>
                  {promoData[index].icon}
                </div>
                <Title
                  level={3}
                  style={{ color: "#1b5e20", marginBottom: "10px" }}>
                  {promoData[index].title}
                </Title>
                <Text
                  style={{ fontSize: "16px", color: "#666", display: "block" }}>
                  {promoData[index].desc}
                </Text>
              </div>

              <div style={{ marginTop: "20px" }}>
                <Progress
                  percent={percent}
                  status="active"
                  strokeColor={{
                    "0%": "#4caf50",
                    "100%": "#2e7d32",
                  }}
                  showInfo={true}
                  format={(p) => (
                    <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
                      {p}%
                    </span>
                  )}
                />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {user
                    ? "पहचान सफल! डैशबोर्ड तैयार है..."
                    : "किसान डेटा लोड हो रहा है..."}
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// --- Inline Styles (For Cleanliness) ---

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#f4f7f6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const cardStyle = {
  borderRadius: "24px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  textAlign: "center",
  background: "#ffffff",
};

export default FarmerLoader;
