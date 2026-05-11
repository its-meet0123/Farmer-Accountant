import {
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddOutlined,
  QuestionCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { ArrowRight, HardHat, Pickaxe, Store, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const DashbordInfo = () => {
  const { t } = useAuth();
  return (
    <div>
      <h3 style={{ color: "#faad14" }}>
        <ArrowRight /> {t("infoDashboard.title")}
      </h3>
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ margin: "0.5rem 0.2rem 0.5rem 0.2rem" }}>
        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <Store
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>{t("infoDashboard.season.title")}</h3>
            <ul>
              <li>{t("infoDashboard.season.desc1")}</li>
              <li>{t("infoDashboard.season.desc2")}</li>

              <li>{t("infoDashboard.season.desc3")}</li>
              <li>{t("infoDashboard.season.desc4")}</li>
              <li>{t("infoDashboard.season.desc5")}</li>

              <li>{t("infoDashboard.season.desc6")}</li>
              <li>{t("infoDashboard.season.desc7")}</li>
              <li>
                {t("infoDashboard.season.desc8")}{" "}
                <Link to="/season" style={{ fontSize: "16px" }}>
                  Seasons
                </Link>
              </li>
            </ul>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <Store
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>
              {t("infoDashboard.arhatiya.title")}
            </h3>
            <ul>
              <li>{t("infoDashboard.arhatiya.desc1")}</li>
              <li>
                {t("infoDashboard.arhatiya.desc2")}
                <Link to="/home" style={{ fontSize: "16px" }}>
                  Traders
                </Link>
              </li>
              <li>
                {t("infoDashboard.arhatiya.desc3")}
                <Link to="/view" style={{ fontSize: "16px" }}>
                  Vendors
                </Link>
              </li>
              <li>{t("infoDashboard.arhatiya.interest_note")}</li>
              <li>{t("infoDashboard.arhatiya.flexibility")}</li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <Pickaxe
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>
              {t("infoDashboard.permanent_worker.title")}
            </h3>
            <ul>
              <li>{t("infoDashboard.permanent_worker.desc1")}</li>
              <li>
                {t("infoDashboard.permanent_worker.desc2")}
                <Link to="/worker" style={{ fontSize: "16px" }}>
                  Permanent Worker
                </Link>{" "}
              </li>
              <li>
                {t("infoDashboard.permanent_worker.desc3")}
                ["
                <FileAddOutlined size={32} />
                "]
              </li>
              <li>{t("infoDashboard.permanent_worker.advance_note")}</li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <HardHat
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>
              {t("infoDashboard.casual_labor.title")}
            </h3>
            <ul>
              <li>{t("infoDashboard.casual_labor.desc1")}</li>
              <li>
                {t("infoDashboard.casual_labor.desc2")}
                <Link to="/other/labor" style={{ fontSize: "16px" }}>
                  Casual Labor
                </Link>
              </li>
              <li>
                {t("infoDashboard.casual_labor.desc3")} ["
                <FileAddOutlined size={32} />
                "]
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ margin: "0.5rem 0.2rem 0.5rem 0.2rem" }}>
        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <Truck
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>
              {t("infoDashboard.machinery.title")}
            </h3>
            <ul>
              <li>{t("infoDashboard.machinery.desc1")}</li>
              <li>
                {t("infoDashboard.machinery.desc2")}
                <Link to="/other/mechanized" style={{ fontSize: "16px" }}>
                  Mechanized Hiring
                </Link>
              </li>
              <li>
                {t("infoDashboard.machinery.desc3")}
                <FileAddOutlined size={32} />
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <QuestionCircleOutlined
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>{t("infoDashboard.info.title")}</h3>
            <ul>
              <li>{t("infoDashboard.info.tabs")}</li>
              <li>{t("infoDashboard.info.title.dashboard")}</li>
              <li>
                {t("infoDashboard.info.records")}
                ["
                <EyeOutlined size={32} />, <DownloadOutlined size={32} />
                "]
              </li>
              <li>
                {t("infoDashboard.info.edit_delete")}
                ["
                <EditOutlined size={32} />
                "]
              </li>
              <li>{t("infoDashboard.info.digital_dairy")}</li>
              <li>{t("infoDashboard.info.contact")}</li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <WarningOutlined
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>
              {t("infoDashboard.warning.title")}
            </h3>
            <ul>
              <li>{t("infoDashboard.warning.delete_account")}</li>
              <li>{t("infoDashboard.warning.delete_entity")}</li>
              <li>{t("infoDashboard.warning.edit_notice")}</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
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
