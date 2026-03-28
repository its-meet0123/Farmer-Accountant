import { useEffect, useState } from "react";

import { getDashbordData } from "../../service/dashbord";
import { message, Spin } from "antd";
import { useLocation } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "../../auth/AuthContext";

const DashBord = () => {
  const location = useLocation();
  const [isLoanding, setIsLoanding] = useState(false);
  const [dashbordData, setDeshbordData] = useState({});
  const { t } = useAuth();
  useEffect(() => {
    async function getData() {
      try {
        setIsLoanding(true);
        const res = await getDashbordData();
        const data = await res.data;
        setDeshbordData(data.data);
        message.success(data.Code);
        setIsLoanding(false);
      } catch (err) {
        console.error("Error message:", err.message);
        message.error("Dashbord data not fetched");
      }
    }
    getData();
  }, [location.pathname]);
  const features = [
    {
      title: "Shops & Inventory",
      desc:
        dashbordData?.shopes && Array.isArray(dashbordData.shopes)
          ? dashbordData.shopes.map((shop) => ({
              name: shop.shopeNumber || "",
              total: shop.overAllTotal || 0,
            }))
          : [{ isEmpty: true, name: t("dashbord.features.dtfs2"), total: 0 }],
    },
    {
      title: "Permanent Workers",
      desc:
        dashbordData?.workers && Array.isArray(dashbordData.workers)
          ? dashbordData.workers.map((worker) => ({
              name: worker.workerName || "",
              total: worker.overAllTotal || 0,
            }))
          : [{ isEmpty: true, name: t("dashbord.features.dtfpw2"), total: 0 }],
    },
    {
      title: "Casual Labor",
      desc:
        dashbordData?.casualLabors && Array.isArray(dashbordData.casualLabors)
          ? dashbordData.casualLabors.map((labor) => ({
              name: labor.laborName || "",
              total: labor.pending || 0,
            }))
          : [{ isEmpty: true, name: t("dashbord.features.dtfcl2"), total: 0 }],
    },
    {
      title: "Harvester & Tools",
      desc:
        dashbordData?.harvesters && Array.isArray(dashbordData.harvesters)
          ? dashbordData.harvesters.map((harvest) => ({
              name: harvest.opratorName || "",
              total: harvest.pending || 0,
            }))
          : [{ isEmpty: true, name: t("dashbord.features.dtfhl2"), total: 0 }],
    },
  ];

  // features.forEach((feature, idx) => {
  //   console.log(`Feature ${idx} (${feature.title}):`, {
  //     hasDesc: !!feature.desc,
  //     isArray: Array.isArray(feature.desc),
  //     length: feature.desc?.length || 0,
  //     desc: feature.desc,
  //   });
  // });
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>
          FARMER-<span style={{ color: "#4da3ff" }}>ACCOUNTANT</span>
        </h1>
        <p style={styles.headerSubtitle}>
          Cultivating growth through organized farm accounting.
        </p>
      </header>

      <div style={styles.mainGrid}>
        {features && Array.isArray(features) && features.length > 0 ? (
          features.map((item, index) => {
            // FIX: Check if item exists and its desc array has at least one element
            if (!item || !Array.isArray(item.desc) || item.desc.length === 0) {
              return null; // Kuch bhi render nahi karega agar data khali hai
            }

            return (
              <FeatureCard key={index} item={item} isLoanding={isLoanding} />
            );
          })
        ) : (
          <div style={styles.noData}>No accounting data found...</div>
        )}
      </div>

      <div style={styles.footerBar}></div>
    </div>
  );
};

const FeatureCard = ({ item, isLoanding }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Strict validation: ensure item.desc is always an array
  const descArray = Array.isArray(item?.desc) ? item.desc : [];

  const hasMultipleDesc = descArray.length > 1;

  useEffect(() => {
    if (hasMultipleDesc) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === descArray.length - 1 ? 0 : prevIndex + 1,
        );
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [hasMultipleDesc, descArray.length]);

  // Guard check after hooks - don't render if invalid item
  if (!item || typeof item !== "object") {
    return null;
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>{item.title}</div>
      {isLoanding ? (
        <Spin indicator={<LoadingOutlined spin />} size="small" />
      ) : (
        <div style={styles.scrollArea}>
          <div
            style={{
              display: "flex",
              width: `${descArray.length * 100}%`,
              transform: `translateX(-${(currentIndex * 100) / descArray.length}%)`,
              //transform: `translateX(-${currentIndex * 100}%)`,
              transition: hasMultipleDesc
                ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
              height: "100%",
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
                      ...styles.dataName,
                      // Agar text bada hai toh size 1.1rem ya 1.2rem rakhein
                      fontSize: data.isEmpty ? "1.15rem" : "1.4rem",
                      fontWeight: data.isEmpty ? "400" : "600",
                      color: "#ffffff",
                      opacity: data.isEmpty ? 0.7 : 1,
                      lineHeight: "1.6", // Lines ke beech gap taaki padhne mein aasaan ho
                      textAlign: "center",
                      margin: "0 auto",
                      maxWidth: "90%", // Side se thoda gap chhoda hai
                      wordBreak: "break-word", // Badi lines ko automatic wrap karega
                    }}>
                    {data?.name || "N/A"}
                  </p>

                  {!data.isEmpty && (
                    <div style={styles.amountBadge}>
                      <span style={styles.currency}>₹</span>{" "}
                      {data?.total?.toLocaleString("en-IN") || 0}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasMultipleDesc && (
        <div style={styles.dotsContainer}>
          {descArray.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                width: currentIndex === i ? "20px" : "6px",
                opacity: currentIndex === i ? 1 : 0.4,
                backgroundColor: "#4da3ff", // Light blue dots
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    // Image ke background jaisa dark teal gradient
    background: "radial-gradient(circle, #1a4a5e 0%, #0d2836 100%)",
    minHeight: "100vh",
    width: "100%",
    fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
    paddingBottom: "60px",
  },
  header: {
    textAlign: "center",
    padding: "60px 20px",
  },
  headerTitle: {
    fontSize: "clamp(2rem, 8vw, 3.5rem)",
    margin: 0,
    color: "#ffffff",
    fontWeight: "800",
    letterSpacing: "-1px",
  },
  headerSubtitle: {
    fontSize: "1.2rem",
    color: "#ffffff",
    marginTop: "15px",
    opacity: 0.8,
    fontWeight: "400",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 25px",
  },
  card: {
    height: "260px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "24px",
    overflow: "hidden",
    backgroundColor: "#161d2f",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    transition: "transform 0.3s ease, border-color 0.3s ease",
    position: "relative",
  },
  cardHeader: {
    background: "rgba(255, 255, 255, 0.03)",
    color: "#4da3ff",
    padding: "20px 10px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "1.1rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  scrollArea: {
    flex: 1,
    overflow: "hidden",
  },
  descSlide: {
    width: "100%", // Ye slider ke total width ka part banega
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  contentBox: {
    textAlign: "center",
    padding: "20px",
  },
  dataName: {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "10px",
  },
  amountBadge: {
    display: "inline-block",
    backgroundColor: "rgba(77, 163, 255, 0.15)",
    color: "#4da3ff",
    padding: "8px 20px",
    borderRadius: "50px",
    fontSize: "1.2rem",
    fontWeight: "700",
    border: "1px solid rgba(77, 163, 255, 0.3)",
  },
  currency: {
    fontSize: "0.9rem",
    marginRight: "2px",
    opacity: 0.8,
  },
  noData: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.4)",
    fontStyle: "italic",
  },
  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "6px",
    paddingBottom: "20px",
  },
  dot: {
    height: "6px",
    borderRadius: "10px",
    backgroundColor: "#4da3ff",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  footerBar: {
    height: "6px",
    backgroundColor: "#1b75ff", // Login button blue
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 100,
  },
};

export default DashBord;
