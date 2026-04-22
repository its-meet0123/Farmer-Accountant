import {
  CalculatorOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";

const DashbordInfo = () => {
  return (
    <>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <UserAddOutlined
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>Farmer Management</h3>
            <p>
              Naye kisan bhaiyon ko add karein aur unka saara record ek hi jagah
              maintain karein.
            </p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <CalculatorOutlined
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>Automatic Interest</h3>
            <p>
              Byaj ki calculation ab seconds mein hogi. Purane hisab-kitab ki
              jhanjhat khatam.
            </p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <SafetyCertificateOutlined
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>Secure & Digital</h3>
            <p>
              Aapka data encrypted hai. Kahin bhi, kabhi bhi apne mobile se
              hisab check karein.
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashbordInfo;

const glassStyle = {
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(8.5px)",
  WebkitBackdropFilter: "blur(8.5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  color: "#fff",
};
