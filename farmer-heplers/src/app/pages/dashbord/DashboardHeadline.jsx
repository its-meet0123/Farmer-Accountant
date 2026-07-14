import React from "react";
import { Row, Col, Badge } from "antd";
import {
  ThunderboltOutlined,
  CloudOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";

const DashboardHeadline = () => {
  // Shudh Hindi data - Jo ab grid me ek sath render hoga
  const headlines = [
    {
      id: 1,
      type: "weather",
      title: "मौसम एवं फसल परामर्श (Advisory)",
      content:
        "आगामी 3 दिनों में क्षेत्र में वर्षा की संभावना है। नरमा, कपास और ग्वार की फसल में अभी किसी भी प्रकार के कीटनाशक का छिड़काव रोक दें। वर्षा समाप्त होने के पश्चात ही आवश्यकतानुसार स्प्रे करें।",
      icon: <CloudOutlined style={{ color: "#00bfff" }} />,
    },
    {
      id: 2,
      type: "rates",
      title: "ईंधन एवं उर्वरक के दैनिक भाव",
      content:
        "डीजल: ₹90.50/लीटर | डी.ए.पी. (DAP): ₹1,350/बोरी | यूरिया: ₹266.50/बोरी। (बाजार के अनुसार स्थानीय दामों में आंशिक बदलाव संभव है)।",
      icon: <ThunderboltOutlined style={{ color: "#ffd700" }} />,
    },
    {
      id: 3,
      type: "medicine",
      title: "मुख्य फसलें एवं अनुशंसित साल्ट (Salt) जानकारी",
      content:
        '1. धान: शुरुआती कीट व सुंडी के लिए "कार्टाप हाइड्रोक्लोराइड" या "क्लोरेंट्रानिलिप्रोल" का उपयोग करें।\n' +
        '2. नरमा / कपास: सफेद मक्खी व तेले (Jassid) के नियंत्रण के लिए "एसिटामिप्रिड" या "डाईफेन्थियूरॉन" प्रभावी है।\n' +
        '3. मूंग (मूँगी): रस चूसक कीटों और फली छेदक सुंडी के लिए "इमामेक्टिन बेंजोएट" का छिड़काव करें।\n' +
        '4. ग्वार (गुवारा): जड़ गलन (Root Rot) से बचाव के लिए "कार्बेंडाजिम + मैंकोजेब" युक्त कवकनाशी का प्रयोग करें।',
      icon: <ExperimentOutlined style={{ color: "#32cd32" }} />,
    },
  ];

  // Common card styling for clean Glassmorphism
  const cardStyle = {
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    padding: "20px",
    boxShadow: "0 6px 20px 0 rgba(31, 38, 135, 0.15)",
    height: "100%", // Card ki height automatic barabar rahegi
    transition: "all 0.3s ease",
  };

  return (
    <div style={{ padding: "4px", marginTop: "20px" }}>
      {/* Ant Design Row - gutter se columns ke beech space bnega */}
      <Row gutter={[20, 20]}>
        {headlines.map((item) => (
          // xs={24} matlab mobile par full width, lg={8} matlab desktop par 3 columns ek line me
          <Col
            xs={24}
            lg={item.type === "medicine" ? 24 : 12}
            xl={item.type === "medicine" ? 12 : 6}
            key={item.id}
            style={{ display: "flex" }}>
            <div style={cardStyle}>
              <Row gutter={12} align="top">
                <Col
                  span={4}
                  style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      fontSize: "22px",
                      background: "rgba(255,255,255,0.18)",
                      padding: "10px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "44px",
                      height: "44px",
                    }}>
                    {item.icon}
                  </div>
                </Col>
                <Col span={20}>
                  <h4
                    style={{
                      margin: 0,
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}>
                    {item.title}{" "}
                    <Badge status="processing" style={{ marginLeft: 8 }} />
                  </h4>
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      color: "#e6e6e6",
                      fontSize: "13.5px",
                      lineHeight: "1.6",
                      whiteSpace: "pre-line",
                    }}>
                    {item.content}
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardHeadline;
