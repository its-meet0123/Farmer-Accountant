import {
  CalculatorOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const DashbordInfo = () => {
  return (
    <>
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ margin: "0 2rem 0 2rem" }}>
        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <UserAddOutlined
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>Arhatiya (Bahi-Khata)</h3>
            <ul>
              <li>Arhatiya ka hisab kitab rkhne ka asaan trika </li>
              <li>
                Apna Bahi-Khata chalu krne ke liye{" "}
                <Link to="/home">Traders</Link> per jaaye or Add Industry button
                per click krne per ik form open hoga use fill kre.
              </li>
              <li>
                Form fill krne ke baad <Link to="/view">Vendors</Link> per jaaye
                vaha aapko apne Arhatiya ki Shope Number waali list mil jaaye gi
                jiske Action columns mai + icon waale button per click kre ik or
                form opne hoga jis se apna lenn denn chaalu kre.
              </li>
              <li>
                Es form ke ander Rate/drr ya byaj dar 2 rupiya secda (2%) ke
                liye <b>24</b> daale. 1.5 rupiya secda (1.5%) ke liye <b>18</b>{" "}
                daale. 1 rupiya secda (1%) ke liye <b>12</b> daale.
              </li>
              <li>
                Form ke fields ko alg alg len den daalne ke trike se set kiya
                gya hai aap apne len den ke hisaab se bhr skte hai.
              </li>
            </ul>
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
