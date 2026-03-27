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
      title: "Vendor Ledger",
      desc: [
        "Track all your purchases from seed and fertilizer stores.",
        "Keep your credits and payments clear with every trader.",
        "Digital records for seeds and fertilizers.",
      ],
    },
    {
      title: "Sharecropping",
      desc: ["Easily manage workers on share-basis (1/4th, 1/5th)."],
    },
    {
      title: "Labor & Custom Hiring",
      desc: [
        "Track daily wages for casual labor.",
        "Hiring costs for tractors or harvesters.",
        "Manage multiple workers without paperwork.",
      ],
    },
    {
      title: "Farm P&L Tracker",
      desc: [
        "Total income minus all expenses.",
        "Built-in automatic interest calculation.",
      ],
    },
  ];

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>FARMER-ACCOUNTANT</h1>
        <p style={styles.headerSubtitle}>
          Farming accounts, now digital and easy.
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
      }, 4500); // 4.5 seconds hold time

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
            // Smooth Amazon-style transition
            transition: hasMultipleDesc
              ? "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
            height: "100%",
          }}>
          {item.desc.map((text, i) => (
            <div key={i} style={styles.descSlide}>
              <p style={{ margin: 0 }}>{text}</p>
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
                width: currentIndex === i ? "12px" : "6px", // Active dot expand effect
                opacity: currentIndex === i ? 1 : 0.4,
                backgroundColor: "white",
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
    backgroundColor: "#f3d0da",
    minHeight: "100vh",
    width: "100%",
    fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
    paddingBottom: "60px",
  },
  header: {
    backgroundColor: "#a3518f",
    color: "white",
    textAlign: "center",
    padding: "50px 20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  headerTitle: {
    fontSize: "clamp(2rem, 8vw, 3.5rem)", // Responsive font size
    margin: 0,
    fontWeight: "800",
    letterSpacing: "1px",
  },
  headerSubtitle: {
    fontSize: "1.2rem",
    fontStyle: "italic",
    marginTop: "10px",
    opacity: 0.9,
    textDecoration: "underline",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "0 25px",
  },
  card: {
    height: "280px", // Slightly taller for better spacing
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "#a3518f",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease",
  },
  cardHeader: {
    backgroundColor: "#e56b5f",
    color: "white",
    padding: "18px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.1rem",
    letterSpacing: "0.5px",
    zIndex: 5,
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
    color: "white",
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
    padding: "15px",
    gap: "6px",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  dot: {
    height: "6px",
    borderRadius: "10px",
    transition: "all 0.4s ease",
  },
  footerBar: {
    height: "12px",
    backgroundColor: "#e56b5f",
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 100,
  },
};

export default DashBord;
