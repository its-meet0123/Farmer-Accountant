import React, { useState, useEffect } from "react";
import {
  Card,
  Progress,
  Typography,
  Space,
  Spin,
  Row,
  Col,
  Button,
} from "antd";
import {
  LineChartOutlined,
  WalletOutlined,
  SafetyOutlined,
  DashboardOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const FarmerLoader = ({ isLoading, user }) => {
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [show, setShow] = useState(true);
  const [showReload, setShowReload] = useState(false);

  // हर प्रोमो के लिए अलग बैकग्राउंड इमेज यहाँ सेट की गई है
  const promoData = [
    {
      title: "सटीक डिजिटल डायरी",
      desc: "अब बीज से लेकर बाजार तक का हर हिसाब आपकी जेब में।",
      bgImage: "url('/digital_dairy.png')", // अपनी इमेज का पाथ डालें
      icon: (
        <LineChartOutlined style={{ fontSize: "42px", color: "#2ecc71" }} />
      ),
    },
    {
      title: "मजदूरी और खाद का हिसाब",
      desc: "लेबर और खाद के खर्चों को ट्रैक करें और फिजूलखर्ची रोकें।",
      bgImage: "url('/calculating.png')", // अपनी इमेज का पाथ डालें
      icon: <WalletOutlined style={{ fontSize: "42px", color: "#3498db" }} />,
    },
    {
      title: "हार्वेस्टिंग ट्रैकर",
      desc: "फसल कटाई के समय का मैनेजमेंट अब और भी आसान।",
      bgImage: "url('/harvesting_tracker.png')", // अपनी इमेज का पाथ डालें
      icon: (
        <DashboardOutlined style={{ fontSize: "42px", color: "#f1c40f" }} />
      ),
    },
    {
      title: "सुरक्षित डेटा",
      desc: "आपका डेटा पूरी तरह एन्क्रिप्टेड और सुरक्षित है।",
      bgImage: "url('/secure_data.png')", // अपनी इमेज का पाथ डालें
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
    let timeOutTimer;

    if (!user) {
      progressTimer = setInterval(() => {
        setPercent((prev) => (prev < 95 ? prev + 1 : prev));
      }, 200);

      timeOutTimer = setTimeout(() => {
        if (!user) setShowReload(true);
      }, 20000);
    } else {
      setPercent(100);
      setShowReload(false);
      setTimeout(() => setShow(false), 500);
    }

    return () => {
      clearInterval(progressTimer);
      clearTimeout(timeOutTimer);
    };
  }, [user]);

  const handleReload = () => {
    window.location.reload();
  };

  if (!show && !isLoading) return null;

  return (
    <div style={overlayStyle}>
      <Row justify="center" align="middle" style={{ width: "100%" }}>
        <Col xs={22} sm={16} md={12} lg={8}>
          <Card
            bordered={false}
            style={cardStyle}
            bodyStyle={{ padding: "40px 24px", background: "transparent" }}>
            <Space
              direction="vertical"
              size="large"
              style={{ width: "100%", textAlign: "center" }}>
              {!showReload && <Spin size="large" tip="लोड हो रहा है..." />}

              {/* यहाँ डायनामिक बैकग्राउंड स्टाइल लागू किया गया है।
                टेक्स्ट साफ़ दिखे इसलिए 'linear-gradient' का इस्तेमाल करके 
                इमेज के ऊपर एक हल्का सफ़ेद ओवरले दिया गया है।
              */}
              <div
                style={{
                  minHeight: "220px",
                  padding: "20px",
                  borderRadius: "16px",
                  transition: "all 1s ease-in-out",
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), ${promoData[index].bgImage}`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <div style={{ marginBottom: "15px" }}>
                  {promoData[index].icon}
                </div>
                <Title
                  level={3}
                  style={{
                    color: "#1b5e20",
                    marginBottom: "10px",
                    marginTop: 0,
                  }}>
                  {promoData[index].title}
                </Title>
                <Text
                  style={{
                    fontSize: "16px",
                    color: "#333",
                    fontWeight: "500",
                    display: "block",
                  }}>
                  {promoData[index].desc}
                </Text>
              </div>

              <div style={{ marginTop: "20px" }}>
                <Progress
                  percent={percent}
                  status={
                    showReload
                      ? "exception"
                      : percent === 100
                        ? "success"
                        : "active"
                  }
                  strokeColor={
                    percent === 100
                      ? "#52c41a"
                      : showReload
                        ? "#ff4d4f"
                        : "#4caf50"
                  }
                  showInfo={true}
                  format={(p) => (
                    <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
                      {p}%
                    </span>
                  )}
                />
                {showReload ? (
                  <div style={{ marginTop: "15px" }}>
                    <Text
                      type="danger"
                      style={{ display: "block", marginBottom: "10px" }}>
                      सर्वर रिस्पॉन्स नहीं दे रहा है। कृपया पेज रिफ्रेश करें।
                    </Text>
                    <Button
                      type="primary"
                      danger
                      icon={<ReloadOutlined />}
                      onClick={handleReload}
                      size="large"
                      shape="round">
                      अभी रीलोड करें
                    </Button>
                  </div>
                ) : (
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {user
                      ? "सफलतापूर्वक लॉगिन!"
                      : "किसान डेटा तैयार हो रहा है, कृपया रुकें..."}
                  </Text>
                )}
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// --- Inline Styles ---

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
  height: "100%",
  width: "100%",
  textAlign: "center",
  backgroundColor: "#ffffff", // यहाँ से पुरानी इमेज हटा कर सिंपल वाइट बैकग्राउंड कर दिया है
};

export default FarmerLoader;
