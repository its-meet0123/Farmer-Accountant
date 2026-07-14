import React from "react";
import { Carousel, Row, Col, Badge } from "antd";
import {
  ThunderboltOutlined,
  CloudOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";

const DashboardHeadline = () => {
  // Shudh Hindi data fasal aur salts ki poori jankari ke saath
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
        '1. धान: शुरुआती कीट व सुंडी के लिए "कार्टाप हाइड्रोक्लोराइड" (Cartap Hydrochloride) या "क्लोरेंट्रानिलिप्रोल" (Chlorantraniliprole) का उपयोग करें।\n' +
        '2. नरमा / कपास: सफेद मक्खी व तेले (Jassid) के नियंत्रण के लिए "एसिटामिप्रिड" (Acetamiprid) या "डाईफेन्थियूरॉन" (Diafenthiuron) साल्ट प्रभावी है।\n' +
        '3. मूंग (मूँगी): रस चूसक कीटों और फली छेदक सुंडी के लिए "इमामेक्टिन बेंजोएट" (Emamectin Benzoate) साल्ट का छिड़काव करें।\n' +
        '4. ग्वार (गुवारा): जड़ गलन (Root Rot) से बचाव के लिए "कार्बेंडाजिम + मैंकोजेब" (Carbendazim + Mancozeb) युक्त कवकनाशी का प्रयोग करें।',
      icon: <ExperimentOutlined style={{ color: "#32cd32" }} />,
    },
  ];

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        padding: "20px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
        marginBottom: "24px",
      }}>
      <Carousel autoplay dotPosition="right" effect="fade" autoplaySpeed={7000}>
        {headlines.map((item) => (
          <div key={item.id}>
            <Row align="middle" gutter={16}>
              <Col xs={4} sm={2}>
                <div
                  style={{
                    fontSize: "24px",
                    background: "rgba(255,255,255,0.2)",
                    padding: "10px",
                    borderRadius: "50%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  {item.icon}
                </div>
              </Col>
              <Col xs={20} sm={22}>
                <h4
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}>
                  {item.title}{" "}
                  <Badge status="processing" style={{ marginLeft: 8 }} />
                </h4>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    color: "#f0f0f0",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-line", // Isse new line (\n) sahi se break hogi
                  }}>
                  {item.content}
                </p>
              </Col>
            </Row>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DashboardHeadline;
