import React, { useEffect, useState } from "react";
import LanguageChangeDropDown from "./LanguageChangeDropdown";
import { Card, Grid } from "antd";

const { useBreakpoint } = Grid;

const AuthContainer = ({
  children,
  title,
  subtitle,
  sologntext,
  keytext,
  t,
  showLangButton = true,
}) => {
  // Screen size check karne ke liye state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    overlay: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "10px" : "20px",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      position: "relative",
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(4, 153, 169, 0.6) 0%, rgba(2, 63, 85, 0.9) 90%),
        radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.4) 0%, rgba(30, 27, 75, 1) 100%)
      `,
      overflowX: "hidden",
      WebkitOverflowScrolling: "touch",
      //backgroundAttachment: "fixed",
    },
    langWrapper: {
      position: "absolute",
      top: "20px",
      right: "20px",
      zIndex: 10,
    },
    card: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Mobile pe vertical layout
      width: "100%",
      maxWidth: isMobile ? "100%" : "960px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: isMobile ? "16px" : "24px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
      overflow: "hidden",
      minHeight: isMobile ? "auto" : "500px",
      backdropFilter: "blur(5px)",
    },
    leftPanel: {
      flex: 1,
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      padding: isMobile ? "40px 20px" : "60px",
      display: isMobile && !sologntext ? "none" : "flex", // Agar mobile pe slogan nahi dikhana to hide kar sakte hain
      flexDirection: "column",
      justifyContent: "center",
      color: "#F8FAFC",
    },
    rightPanel: {
      flex: 1.2,
      padding: isMobile ? "40px 20px" : "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    title: {
      fontSize: isMobile ? "1.8rem" : "2.5rem",
      fontWeight: "800",
      color: "#0F172A",
      margin: "0 0 10px 0",
      letterSpacing: "-1px",
    },
    subtitle: {
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      color: "#475569",
      marginBottom: "30px",
      fontWeight: "400",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {showLangButton && (
          <div style={styles.langWrapper}>
            <LanguageChangeDropDown />
          </div>
        )}
        {/* Branding Side - Mobile par chota ya hide ho jayega */}
        <div style={styles.leftPanel}>
          <div
            style={{
              marginBottom: "20px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#38BDF8",
            }}>
            {t("pageContainer.logotext")}
          </div>

          <h1
            style={{
              fontSize: isMobile ? "2rem" : "3rem",
              fontWeight: "800",
              marginBottom: "20px",
              lineHeight: "1.1",
            }}>
            {sologntext?.text1}{" "}
            <span style={{ color: "#38BDF8" }}>{sologntext?.text2}</span>
          </h1>

          {!isMobile && (
            <p style={{ opacity: 0.7, fontSize: "1rem", fontWeight: "300" }}>
              {keytext}
            </p>
          )}
        </div>

        {/* Form Side */}
        <div style={styles.rightPanel}>
          <h2 style={styles.title}>{title}</h2>
          {subtitle && <p style={styles.subtitle}>{subtitle}</p>}

          {/* Form Content */}
          <Card style={{ width: "100%" }}>{children}</Card>
        </div>
      </div>
    </div>
  );
};

const PageContainer = ({ title, children, extra }) => {
  const screen = useBreakpoint();
  const style = {
    backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(4, 153, 169, 0.6) 0%, rgba(2, 63, 85, 0.9) 90%),
        radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.4) 0%, rgba(30, 27, 75, 1) 100%)
      `,
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      color: "#0F172A",
      margin: "0 0 10px 0",
      letterSpacing: "-1px",
    },
  };

  return (
    <Card
      style={{
        backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(4, 153, 169, 0.6) 0%, rgba(2, 63, 85, 0.9) 90%),
        radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.4) 0%, rgba(30, 27, 75, 1) 100%)
      `,
        width: "100%",
        borderRadius: "12px",
        minHeight: "100vh",
        // overflow: "auto",
      }}
      styles={{
        body: {
          padding: "clamp(0, 1px, 24px)",
          overflowX: "auto",
          overflowY: "auto",
        },
        header: {
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        },
      }}
      title={
        <span
          style={{
            fontSize: "clamp(1rem, 4vw, 1.25rem)",
            display: "block",
            color: "#0f172a",
            whiteSpace: "normal",
            lineHeight: "1.4",
          }}>
          {title}
        </span>
      }
      extra={extra}>
      <div
        style={{
          minWidth: "100%",
        }}>
        {children}
      </div>
    </Card>
  );
};

export { AuthContainer, PageContainer };
