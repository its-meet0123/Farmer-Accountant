import { useEffect, useState } from "react";
import { PageContainer } from "../../component/PageContainer";
import { getDashbordData } from "../../service/dashbord";
import { message } from "antd";

const DashBord = () => {
  const [dashbordData, setDeshbordData] = useState({});
  useEffect(() => {
    async function getData() {
      try {
        const res = await getDashbordData();
        const data = await res.data;
        console.log(data);
        setDeshbordData(data.data);
        message.success(data.Code);
      } catch (err) {
        console.log(err.message);
        message.error("Dashbord data not fetched");
      }
    }
    getData();
  }, []);
  const features = [
    {
      title: "Shops & Inventory",
      desc: dashbordData.shopes.map((shop) => {
        return {
          name: shop.shopeNumber,
          total: shop.overAllTotal,
        };
      }),
    },
    {
      title: "Permanent Workers",
      desc: dashbordData.workers.map((worker) => {
        return {
          name: worker.workerName,
          total: worker.overAllTotal,
        };
      }),
    },
    {
      title: "Casual Labor",
      desc: dashbordData.casualLabors.map((labor) => {
        return {
          name: labor.laborName,
          total: labor.pending,
        };
      }),
    },
    {
      title: "Harvester & Tools",
      desc: dashbordData.harvester.map((harvest) => {
        return {
          name: harvest.opratorName,
          total: harvest.pending,
        };
      }),
    },
  ];

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>
          FARMER-<span style={{ color: "#4da3ff" }}>ACCOUNTANT</span>
        </h1>
        <p style={styles.headerSubtitle}>
          Back to Leading the Future of Farming.
        </p>
      </header>

      <div style={styles.mainGrid}>
        {features.map((item, index) => (
          <FeatureCard key={index} item={item} />
        ))}
      </div>

      <div style={styles.footerBar}></div>
    </div>
  );
};

const FeatureCard = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleDesc = item.desc.length > 1;

  useEffect(() => {
    if (hasMultipleDesc) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === item.desc.length - 1 ? 0 : prevIndex + 1,
        );
      }, 4500);

      return () => clearInterval(timer);
    }
  }, [hasMultipleDesc, item.desc.length]);

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>{item.title}</div>
      <div style={styles.scrollArea}>
        <div
          style={{
            display: "flex",
            width: `${item.desc.length * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / item.desc.length}%)`,
            transition: hasMultipleDesc
              ? "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
            height: "100%",
          }}>
          {item.desc.map((obj, i) => (
            <div key={i} style={styles.descSlide}>
              <p>{obj.name}</p>
              <p style={{ margin: 0 }}>{obj.total}</p>
            </div>
          ))}
        </div>
      </div>

      {hasMultipleDesc && (
        <div style={styles.dotsContainer}>
          {item.desc.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                width: currentIndex === i ? "12px" : "6px",
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
    height: "280px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    overflow: "hidden",
    // Image ke left container jaisa dark blue
    backgroundColor: "#161d2f",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
  },
  cardHeader: {
    color: "#4da3ff", // Light blue from image text
    padding: "25px 18px 10px 18px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: "0.5px",
  },
  scrollArea: {
    flex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  descSlide: {
    width: "100%",
    padding: "0 35px",
    color: "#ffffff",
    fontSize: "1.05rem",
    lineHeight: "1.6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    gap: "6px",
  },
  dot: {
    height: "6px",
    borderRadius: "10px",
    transition: "all 0.4s ease",
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
