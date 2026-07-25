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
import { useState } from "react";

const DashbordInfo = () => {
  const { t } = useAuth();

  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Common Base Styles
  const containerStyle = {
    padding: "24px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  };

  const headerStyle = {
    marginBottom: "32px",
    textAlign: "center",
  };

  const titleStyle = {
    color: "#fbbf24",
    fontSize: "28px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    margin: 0,
  };

  const subtitleStyle = {
    color: "#94a3b8",
    fontSize: "15px",
    marginTop: "6px",
  };

  // Glass Card Base Style
  const getCardStyle = (index, isWarning = false) => ({
    background: isWarning
      ? "rgba(239, 68, 68, 0.08)"
      : "rgba(30, 41, 59, 0.75)",
    backdropFilter: "blur(12px)",
    border: isWarning
      ? "1px solid rgba(239, 68, 68, 0.3)"
      : "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    height: "100%",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: hoveredIndex === index ? "translateY(-6px)" : "translateY(0)",
    boxShadow:
      hoveredIndex === index
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  });

  // Icon Container Badge Style
  const getBadgeStyle = (bg, color) => ({
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    backgroundColor: bg,
    color: color,
  });

  const cardTitleStyle = (color = "#f8fafc") => ({
    color: color,
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
  });

  const listStyle = {
    paddingLeft: "0",
    listStyle: "none",
    margin: "0",
  };

  const listItemStyle = (isWarning = false) => ({
    color: isWarning ? "#fca5a5" : "#cbd5e1",
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "12px",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  });

  const bulletStyle = (color = "#38bdf8") => ({
    color: color,
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "1",
  });

  const linkButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    color: "#38bdf8",
    fontWeight: "600",
    background: "rgba(56, 189, 248, 0.12)",
    padding: "2px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    textDecoration: "none",
    marginLeft: "6px",
    border: "1px solid rgba(56, 189, 248, 0.2)",
  };

  const iconPillStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#e2e8f0",
    padding: "4px 8px",
    borderRadius: "6px",
    margin: "0 3px",
    fontSize: "14px",
  };

  const highlightNoteStyle = {
    background: "rgba(51, 65, 85, 0.5)",
    padding: "8px 12px",
    borderRadius: "6px",
    borderLeft: "3px solid #38bdf8",
    color: "#e2e8f0",
    fontSize: "13px",
    marginBottom: "12px",
  };
  return (
    <div style={containerStyle}>
      {/* Top Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          <ArrowRight size={28} />
          {t("infoDashboard.title")}
        </h2>
        <p style={subtitleStyle}>
          Dashboard ke features aur jankari ko yahan samjhein
        </p>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {/* Card 1: Season */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={getCardStyle(0)}
            hoverable
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <div style={getBadgeStyle("rgba(251, 191, 36, 0.15)", "#fbbf24")}>
              <Store size={28} />
            </div>
            <h3 style={cardTitleStyle()}>{t("infoDashboard.season.title")}</h3>
            <ul style={listStyle}>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#fbbf24")}>•</span>
                {t("infoDashboard.season.desc1")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#fbbf24")}>•</span>
                {t("infoDashboard.season.desc2")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#fbbf24")}>•</span>
                {t("infoDashboard.season.desc3")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#fbbf24")}>•</span>
                {t("infoDashboard.season.desc4")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#fbbf24")}>•</span>
                {t("infoDashboard.season.desc5")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#fbbf24")}>•</span>
                {t("infoDashboard.season.desc6")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#fbbf24")}>•</span>
                {t("infoDashboard.season.desc7")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#fbbf24")}>•</span>
                <div>
                  {t("infoDashboard.season.desc8")}
                  <Link to="/season" style={linkButtonStyle}>
                    Seasons &rarr;
                  </Link>
                </div>
              </li>
            </ul>
          </Card>
        </Col>

        {/* Card 2: Arhatiya */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={getCardStyle(1)}
            hoverable
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <div style={getBadgeStyle("rgba(245, 158, 11, 0.15)", "#f59e0b")}>
              <Store size={28} />
            </div>
            <h3 style={cardTitleStyle()}>
              {t("infoDashboard.arhatiya.title")}
            </h3>
            <ul style={listStyle}>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#f59e0b")}>•</span>
                {t("infoDashboard.arhatiya.desc1")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#f59e0b")}>•</span>
                <div>
                  {t("infoDashboard.arhatiya.desc2")}
                  <Link to="/home" style={linkButtonStyle}>
                    Traders &rarr;
                  </Link>
                </div>
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#f59e0b")}>•</span>
                <div>
                  {t("infoDashboard.arhatiya.desc3")}
                  <Link to="/view" style={linkButtonStyle}>
                    Vendors &rarr;
                  </Link>
                </div>
              </li>
              <div style={highlightNoteStyle}>
                📌 {t("infoDashboard.arhatiya.interest_note")}
              </div>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#f59e0b")}>•</span>
                {t("infoDashboard.arhatiya.flexibility")}
              </li>
            </ul>
          </Card>
        </Col>

        {/* Card 3: Permanent Worker */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={getCardStyle(2)}
            hoverable
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <div style={getBadgeStyle("rgba(59, 130, 246, 0.15)", "#60a5fa")}>
              <Pickaxe size={28} />
            </div>
            <h3 style={cardTitleStyle()}>
              {t("infoDashboard.permanent_worker.title")}
            </h3>
            <ul style={listStyle}>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#60a5fa")}>•</span>
                {t("infoDashboard.permanent_worker.desc1")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#60a5fa")}>•</span>
                <div>
                  {t("infoDashboard.permanent_worker.desc2")}
                  <Link to="/worker" style={linkButtonStyle}>
                    Permanent Worker &rarr;
                  </Link>
                </div>
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#60a5fa")}>•</span>
                <div>
                  {t("infoDashboard.permanent_worker.desc3")}
                  <span style={iconPillStyle}>
                    <FileAddOutlined />
                  </span>
                </div>
              </li>
              <div
                style={{ ...highlightNoteStyle, borderLeftColor: "#60a5fa" }}>
                📌 {t("infoDashboard.permanent_worker.advance_note")}
              </div>
            </ul>
          </Card>
        </Col>

        {/* Card 4: Casual Labor */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={getCardStyle(3)}
            hoverable
            onMouseEnter={() => setHoveredIndex(3)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <div style={getBadgeStyle("rgba(16, 185, 129, 0.15)", "#34d399")}>
              <HardHat size={28} />
            </div>
            <h3 style={cardTitleStyle()}>
              {t("infoDashboard.casual_labor.title")}
            </h3>
            <ul style={listStyle}>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#34d399")}>•</span>
                {t("infoDashboard.casual_labor.desc1")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#34d399")}>•</span>
                <div>
                  {t("infoDashboard.casual_labor.desc2")}
                  <Link to="/other/labor" style={linkButtonStyle}>
                    Casual Labor &rarr;
                  </Link>
                </div>
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#34d399")}>•</span>
                <div>
                  {t("infoDashboard.casual_labor.desc3")}
                  <span style={iconPillStyle}>
                    <FileAddOutlined />
                  </span>
                </div>
              </li>
            </ul>
          </Card>
        </Col>

        {/* Card 5: Machinery */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={getCardStyle(4)}
            hoverable
            onMouseEnter={() => setHoveredIndex(4)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <div style={getBadgeStyle("rgba(168, 85, 247, 0.15)", "#c084fc")}>
              <Truck size={28} />
            </div>
            <h3 style={cardTitleStyle()}>
              {t("infoDashboard.machinery.title")}
            </h3>
            <ul style={listStyle}>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#c084fc")}>•</span>
                {t("infoDashboard.machinery.desc1")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#c084fc")}>•</span>
                <div>
                  {t("infoDashboard.machinery.desc2")}
                  <Link to="/other/mechanized" style={linkButtonStyle}>
                    Mechanized Hiring &rarr;
                  </Link>
                </div>
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#c084fc")}>•</span>
                <div>
                  {t("infoDashboard.machinery.desc3")}
                  <span style={iconPillStyle}>
                    <FileAddOutlined />
                  </span>
                </div>
              </li>
            </ul>
          </Card>
        </Col>

        {/* Card 6: Guide & Info */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={getCardStyle(5)}
            hoverable
            onMouseEnter={() => setHoveredIndex(5)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <div style={getBadgeStyle("rgba(6, 182, 212, 0.15)", "#22d3ee")}>
              <QuestionCircleOutlined style={{ fontSize: "28px" }} />
            </div>
            <h3 style={cardTitleStyle()}>{t("infoDashboard.info.title")}</h3>
            <ul style={listStyle}>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#22d3ee")}>•</span>
                {t("infoDashboard.info.tabs")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#22d3ee")}>•</span>
                {t("infoDashboard.info.title.dashboard")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#22d3ee")}>•</span>
                <div>
                  {t("infoDashboard.info.records")}
                  <span style={iconPillStyle}>
                    <EyeOutlined />
                  </span>
                  <span style={iconPillStyle}>
                    <DownloadOutlined />
                  </span>
                </div>
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#22d3ee")}>•</span>
                <div>
                  {t("infoDashboard.info.edit_delete")}
                  <span style={iconPillStyle}>
                    <EditOutlined />
                  </span>
                </div>
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#22d3ee")}>•</span>
                {t("infoDashboard.info.digital_dairy")}
              </li>
              <li style={listItemStyle()}>
                <span style={bulletStyle("#22d3ee")}>•</span>
                {t("infoDashboard.info.contact")}
              </li>
            </ul>
          </Card>
        </Col>

        {/* Card 7: Warning */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            style={getCardStyle(6, true)}
            hoverable
            onMouseEnter={() => setHoveredIndex(6)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <div style={getBadgeStyle("rgba(239, 68, 68, 0.2)", "#f87171")}>
              <WarningOutlined style={{ fontSize: "28px" }} />
            </div>
            <h3 style={cardTitleStyle("#f87171")}>
              {t("infoDashboard.warning.title")}
            </h3>
            <ul style={listStyle}>
              <li style={listItemStyle(true)}>
                <span style={bulletStyle("#f87171")}>•</span>
                {t("infoDashboard.warning.delete_account")}
              </li>
              <li style={listItemStyle(true)}>
                <span style={bulletStyle("#f87171")}>•</span>
                {t("infoDashboard.warning.delete_entity")}
              </li>
              <li style={listItemStyle(true)}>
                <span style={bulletStyle("#f87171")}>•</span>
                {t("infoDashboard.warning.edit_notice")}
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashbordInfo;

export const glassStyle = {
  position: "relative",

  background:
    "linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.03))",

  border: "1px solid rgba(255,255,255,.12)",

  borderRadius: "24px",

  backdropFilter: "blur(18px)",

  WebkitBackdropFilter: "blur(18px)",

  overflow: "hidden",

  height: "100%",

  transition: ".35s",

  color: "#fff",

  boxShadow: "0 15px 45px rgba(0,0,0,.35), inset 0 1px rgba(255,255,255,.08)",

  cursor: "pointer",

  paddingBottom: 10,
};
