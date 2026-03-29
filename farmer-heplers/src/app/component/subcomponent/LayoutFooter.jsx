import React from "react";
import { Row, Col, Space } from "antd";

import LanguageChangeDropDown from "../LanguageChangeDropdown";
import { footerstyles } from "./FooterStyles.js";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { FacebookFilled, InstagramFilled } from "@ant-design/icons";

const LayoutFooter = ({ t, logout }) => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div style={footerstyles.contentWrapper}>
        <Row gutter={[32, 32]} justify="space-between">
          {/* Section 1: Brand/Logo */}
          <Col xs={24} sm={12} md={6}>
            <h3 style={footerstyles.title}>
              FARMER-<span style={{ color: "#4da3ff" }}>ACCOUNTANT</span>
            </h3>
            <p style={footerstyles.text}>
              Simplifying farm management and accounting for a better future.
            </p>
          </Col>

          {/* Section 2: Quick Links */}
          <Col xs={24} sm={12} md={6}>
            <h4 style={footerstyles.heading}>Quick Links</h4>
            <ul style={footerstyles.list}>
              {/* <li>
                <a href="/" style={footerstyles.link}>
                  Dashboard
                </a>
              </li> */}
              <li>
                <a href="/home" style={footerstyles.link}>
                  {t("layout.menu.home")}
                </a>
              </li>
              <li>
                <a href="/view" style={footerstyles.link}>
                  {t("layout.menu.view")}
                </a>
              </li>
              <li>
                <a href="/worker" style={footerstyles.link}>
                  {t("layout.menu.worker")}
                </a>
              </li>
              <li>
                <a href="/other/labor" style={footerstyles.link}>
                  {t("layout.menu.other.labor")}
                </a>
              </li>
              <li>
                <a href="/other/mechanized" style={footerstyles.link}>
                  {t("layout.menu.other.hiring")}
                </a>
              </li>
              <li>
                <a href="" style={footerstyles.link}>
                  <LanguageChangeDropDown />
                </a>
              </li>
              <li>
                <a href="" style={footerstyles.link} onClick={() => logout()}>
                  {t("layout.menu.logout")}
                </a>
              </li>
            </ul>
          </Col>

          {/* Section 3: Support */}
          <Col xs={24} sm={12} md={6}>
            <h4 style={footerstyles.heading}>Support</h4>
            <Space
              direction="vertical"
              style={{ color: "rgba(255,255,255,0.65)" }}>
              <Space>
                <Phone size={16} /> +91 9166463479
              </Space>
              <Space>
                <Mail size={16} /> sukhramghria63223@gmail.com
              </Space>
            </Space>
          </Col>

          {/* Section 4: Social Connect */}
          <Col xs={24} sm={12} md={6}>
            <h4 style={footerstyles.heading}>Connect With Us</h4>
            <Space size="middle">
              <a
                href="https://wa.me/yournumber"
                style={footerstyles.socialIcon}
                className="whatsapp">
                <MessageCircle size={22} />
              </a>
              <a
                href="https://instagram.com"
                style={footerstyles.socialIcon}
                className="instagram">
                <InstagramFilled size={22} />
              </a>
              <a
                href="https://facebook.com"
                style={footerstyles.socialIcon}
                className="facebook">
                <FacebookFilled size={22} />
              </a>
            </Space>
          </Col>
        </Row>

        <div style={footerstyles.divider} />

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
