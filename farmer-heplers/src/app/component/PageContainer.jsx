import React from "react";
import LanguageChangeDropDown from "./LanguageChangeDropdown";
import { Card } from "antd";

const AuthContainer = ({
  children,
  title,
  subtitle,
  sologntext,
  keytext,
  t,
  showLangButton = true,
}) => {
  // --- Enhanced Inline Style Objects ---
  const styles = {
    overlay: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      position: "relative",

      // *** UNIQUE BACKGROUND START ***
      // 1. Base Gradient: A sophisticated deep teal to charcoal radial gradient
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(4, 153, 169, 0.6) 0%, rgba(2, 63, 85, 0.9) 90%),
        radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.4) 0%, rgba(30, 27, 75, 1) 100%)
      `,
      // 2. Subtle Pattern Overlay (SVG based, cross-browser safe)
      // This creates a very light geometric texture over the gradient
      //   maskImage:
      //     "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
      //   backgroundColor: "#011627", // Fallback color
      //   // *** UNIQUE BACKGROUND END ***
    },
    langWrapper: {
      position: "absolute",
      top: "20px",
      right: "20px",
      zIndex: 10, // Ensures it's above the pattern
    },
    select: {
      padding: "8px 12px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      backdropFilter: "blur(10px)", // Nice frosted glass effect
      cursor: "pointer",
      outline: "none",
      fontSize: "14px",
    },
    card: {
      display: "flex",
      width: "100%",
      maxWidth: "960px", // Slightly wider for a better split
      backgroundColor: "rgba(255, 255, 255, 0.95)", // Slightly translucent
      borderRadius: "24px", // More rounded corners
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)", // Deeper shadow for pop
      overflow: "hidden",
      minHeight: "600px",
      backdropFilter: "blur(5px)", // Subtle blur behind the card
    },
    leftPanel: {
      flex: 1,
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", // Deep slate branding panel
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: "#F8FAFC",
    },
    rightPanel: {
      flex: 1.2, // Gives the form side a bit more room
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      color: "#0F172A",
      margin: "0 0 10px 0",
      letterSpacing: "-1px",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#475569",
      marginBottom: "40px",
      fontWeight: "400",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {/* Branding Side */}
        <div style={styles.leftPanel}>
          <div
            style={{
              marginBottom: "30px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#38BDF8",
            }}>
            {t("pageContainer.logotext")}
          </div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "20px",
              lineHeight: "1.1",
            }}>
            {sologntext.text1}{" "}
            <span style={{ color: "#38BDF8" }}>{sologntext.text2}</span>
          </h1>
          {/* Language Selector */}
          {showLangButton && (
            <div style={styles.langWrapper}>
              <LanguageChangeDropDown />
            </div>
          )}
        </div>
        <div style={styles.rightPanel}>
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.7",
              opacity: 0.8,
              fontWeight: "300",
            }}>
            {keytext}
          </p>
          <h2 style={styles.title}>{title}</h2>
          {subtitle && <p style={styles.subtitle}>{subtitle}</p>}

          {/* Form Content wrapped here */}
          {children}
        </div>

        {/* <div
          style={{
            marginTop: "40px",
            height: "4px",
            width: "60px",
            background: "#38BDF8",
            borderRadius: "2px",
          }}></div> */}
      </div>

      {/* Form Side */}
    </div>
  );
};

const PageContainer = ({ title, children, extra }) => {
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
      }}
      title={
        <p
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#0F172A",
            margin: "0 0 10px 0",
            letterSpacing: "-1px",
          }}>
          {title}
        </p>
      }
      extra={extra}>
      {children}
    </Card>
  );
};

export { AuthContainer, PageContainer };
