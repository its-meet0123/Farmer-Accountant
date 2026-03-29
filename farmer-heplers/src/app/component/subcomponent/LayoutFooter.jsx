import React from "react";
import { Row, Col, Space } from "antd";
import {
  Instagram,
  Facebook,
  MessageCircle, // WhatsApp ke liye
  Mail,
  Phone,
} from "lucide-react";
import LanguageChangeDropDown from "../LanguageChangeDropdown";
import { styles } from "./FooterStyles";

const LayoutFooter = ({ t, logout }) => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div style={styles.contentWrapper}>
        <Row gutter={[32, 32]} justify="space-between">
          {/* Section 1: Brand/Logo */}
          <Col xs={24} sm={12} md={6}>
            <h3 style={styles.title}>
              FARMER-<span style={{ color: "#4da3ff" }}>ACCOUNTANT</span>
            </h3>
            <p style={styles.text}>
              {t("layout.footer_desc") ||
                "Simplifying farm management and accounting for a better future."}
            </p>
          </Col>

          {/* Section 2: Quick Links */}
          <Col xs={24} sm={12} md={6}>
            <h4 style={styles.heading}>Quick Links</h4>
            <ul style={styles.list}>
              {/* <li>
                <a href="/" style={styles.link}>
                  Dashboard
                </a>
              </li> */}
              <li>
                <a href="/home" style={styles.link}>
                  t("layout.menu.home")
                </a>
              </li>
              <li>
                <a href="/view" style={styles.link}>
                  t("layout.menu.view")
                </a>
              </li>
              <li>
                <a href="/worker" style={styles.link}>
                  t("layout.menu.worker")
                </a>
              </li>
              <li>
                <a href="/other/labor" style={styles.link}>
                  t("layout.menu.other.labor")
                </a>
              </li>
              <li>
                <a href="/other/mechanized" style={styles.link}>
                  t("layout.menu.other.hiring")
                </a>
              </li>
              <li>
                <a href="" style={styles.link}>
                  <LanguageChangeDropDown />
                </a>
              </li>
              <li>
                <a href="" style={styles.link} onClick={() => logout()}>
                  t("layout.menu.logout")
                </a>
              </li>
            </ul>
          </Col>

          {/* Section 3: Support */}
          <Col xs={24} sm={12} md={6}>
            <h4 style={styles.heading}>Support</h4>
            <Space
              direction="vertical"
              style={{ color: "rgba(255,255,255,0.65)" }}>
              <Space>
                <Phone size={16} /> +91 98765 43210
              </Space>
              <Space>
                <Mail size={16} /> support@farmeracc.com
              </Space>
            </Space>
          </Col>

          {/* Section 4: Social Connect */}
          <Col xs={24} sm={12} md={6}>
            <h4 style={styles.heading}>Connect With Us</h4>
            <Space size="middle">
              <a
                href="https://wa.me/yournumber"
                style={styles.socialIcon}
                className="whatsapp">
                <MessageCircle size={22} />
              </a>
              <a
                href="https://instagram.com"
                style={styles.socialIcon}
                className="instagram">
                <Instagram size={22} />
              </a>
              <a
                href="https://facebook.com"
                style={styles.socialIcon}
                className="facebook">
                <Facebook size={22} />
              </a>
            </Space>
          </Col>
        </Row>

        <div style={styles.divider} />

        {/* Copyright Line */}
        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.45)" }}>
          {`${t("layout.ft1")} ©${currentYear} ${t("layout.ft2")}`}
          <div style={{ fontSize: "12px", marginTop: "5px" }}>
            Made with ❤️ for Farmers
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutFooter;
