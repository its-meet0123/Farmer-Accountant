import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { styles } from "./DashboardStyles.js";

const FeatureCard = ({ item, isLoading }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const descArray = Array.isArray(item?.desc) ? item.desc : [];
  const hasMultipleDesc = descArray.length > 1;

  useEffect(() => {
    if (hasMultipleDesc) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === descArray.length - 1 ? 0 : prev + 1,
        );
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [hasMultipleDesc, descArray.length]);

  return (
    <div
      style={styles.card}
      onClick={() => item.path && navigate(item.path)}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-10px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
      <div style={styles.cardHeader}>{item.title}</div>

      <div style={styles.scrollArea}>
        {isLoading && descArray.length === 0 ? (
          <div style={styles.centerSpinner}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              width: `${descArray.length * 100}%`,
              transform: `translateX(-${(currentIndex * 100) / descArray.length}%)`,
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              height: "100%",
              opacity: isLoading ? 0.5 : 1,
            }}>
            {descArray.map((data, i) => (
              <div
                key={i}
                style={{
                  ...styles.descSlide,
                  width: `${100 / descArray.length}%`,
                }}>
                <div style={styles.contentBox}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: data.isEmpty ? "1.15rem" : "1.4rem",
                      fontWeight: data.isEmpty ? "400" : "600",
                      color: "#ffffff",
                      opacity: data.isEmpty ? 0.7 : 1,
                      lineHeight: "1.6",
                      wordBreak: "break-word",
                    }}>
                    {data?.name || "N/A"}
                  </p>
                  {!data.isEmpty && (
                    <div style={styles.amountBadge}>{data?.total}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {hasMultipleDesc && !isLoading && (
        <div style={styles.dotsContainer}>
          {descArray.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                width: currentIndex === i ? "20px" : "6px",
                opacity: currentIndex === i ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
