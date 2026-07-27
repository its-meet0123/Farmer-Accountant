import React, { useState } from "react";
import { Avatar, Grid, Space, Tooltip, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

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

  // Pure Styles
  const wrapperStyle = {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition: "opacity 0.2s ease",
    opacity: isHovered ? 0.85 : 1,
  };

  const avatarStyle = {
    background:
      "linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #1d4ed8 100%)",
    border: isHovered
      ? "2px solid #38bdf8"
      : "2px solid rgba(255, 255, 255, 0.4)",
    boxShadow: isHovered
      ? "0 0 12px rgba(56, 189, 248, 0.6)"
      : "0 2px 8px rgba(0, 0, 0, 0.2)",
    fontWeight: "700",
    fontSize: "17px",
    color: "#ffffff",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isHovered ? "scale(1.06)" : "scale(1)",
  };

  const textWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    lineHeight: "1.2",
  };

  const nameTextStyle = {
    color: isHovered ? "#38bdf8" : "#f8fafc",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    letterSpacing: "0.3px",
    textTransform: "capitalize",
    transition: "color 0.3s ease",
  };

  const roleTextStyle = {
    color: "rgba(148, 163, 184, 0.8)",
    fontSize: "11px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    marginTop: "2px",
  };

  return (
    <Tooltip
      title={Name}
      placement="bottom"
      color="#1e293b"
      overlayInnerStyle={{ borderRadius: "8px", fontSize: "12px" }}>
      <div
        style={wrapperStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <Space size={12} align="center">
          {/* Avatar with Smooth Hover Effect */}
          <Avatar size={40} style={avatarStyle}>
            {firstLetter}
          </Avatar>

          {/* User Details */}
          {!isMobile && (
            <div style={textWrapperStyle}>
              <Text style={nameTextStyle}>{Name}</Text>
              <Text style={roleTextStyle}>{role}</Text>
            </div>
          )}
        </Space>
      </div>
    </Tooltip>
  );
};

export default Profile;
