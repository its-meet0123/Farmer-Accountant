import React, { useState } from "react";
import { Avatar, Grid, Space, Tooltip, Typography } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const Profile = ({ userName, role = "User" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md && screens.xs;

  // Name fallback handling
  const Name = userName?.firstName
    ? `${userName.firstName} ${userName.lastName || ""}`
    : "Guest User";

  const firstLetter = userName?.firstName ? (
    userName.firstName.charAt(0).toUpperCase()
  ) : (
    <UserOutlined />
  );

  // Dynamic Styles (Inline)
  const containerStyle = {
    padding: "6px 12px 6px 6px",
    borderRadius: "30px",
    background: isHovered
      ? "rgba(255, 255, 255, 0.12)"
      : "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: isHovered
      ? "1px solid rgba(56, 189, 248, 0.4)"
      : "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: isHovered
      ? "0 4px 20px rgba(56, 189, 248, 0.2)"
      : "0 2px 8px rgba(0, 0, 0, 0.15)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
  };

  const avatarContainerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const avatarStyle = {
    background:
      "linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #1d4ed8 100%)",
    border: "2px solid #ffffff",
    boxShadow: isHovered
      ? "0 0 12px rgba(56, 189, 248, 0.8)"
      : "0 2px 6px rgba(0, 0, 0, 0.2)",
    fontWeight: "700",
    fontSize: "17px",
    color: "#ffffff",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    transition: "all 0.3s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
  };

  const onlineIndicatorStyle = {
    width: "10px",
    height: "10px",
    backgroundColor: "#10b981", // Active Green Dot
    borderRadius: "50%",
    position: "absolute",
    bottom: "2px",
    right: "2px",
    border: "2px solid #0f172a",
    boxShadow: "0 0 6px #10b981",
  };

  const textWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    lineHeight: "1.2",
    paddingLeft: "2px",
  };

  const nameTextStyle = {
    color: "#f8fafc",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    letterSpacing: "0.3px",
    textTransform: "capitalize",
    transition: "color 0.3s ease",
  };

  const roleTextStyle = {
    color: "rgba(148, 163, 184, 0.9)", // Soft Slate Blue
    fontSize: "11px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    marginTop: "2px",
  };

  const arrowIconStyle = {
    color: "#94a3b8",
    fontSize: "11px",
    marginLeft: "4px",
    transition: "transform 0.3s ease, color 0.3s ease",
    transform: isHovered ? "translateY(2px)" : "translateY(0)",
  };

  return (
    <Tooltip
      title={Name}
      placement="bottom"
      color="#1e293b"
      overlayInnerStyle={{ borderRadius: "8px", fontSize: "12px" }}>
      <div
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <Space size={10} align="center">
          {/* Avatar with Glowing Ring & Online Indicator */}
          <div style={avatarContainerStyle}>
            <Avatar size={38} style={avatarStyle}>
              {firstLetter}
            </Avatar>
            <span style={onlineIndicatorStyle} />
          </div>

          {/* User Details (Desktop & Tablet) */}
          {!isMobile && (
            <div style={textWrapperStyle}>
              <Text style={nameTextStyle}>{Name}</Text>
              <Text style={roleTextStyle}>{role}</Text>
            </div>
          )}

          {/* Minimal Dropdown Arrow Indicator */}
          {!isMobile && (
            <DownOutlined
              style={{
                ...arrowIconStyle,
                color: isHovered ? "#38bdf8" : "#94a3b8",
              }}
            />
          )}
        </Space>
      </div>
    </Tooltip>
  );
};

export default Profile;
