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
      desc: "Track all your purchases from seed and fertilizer stores. Keep your credits and payments clear with every trader. Manage daily khata for all your trusted vendors in one place. Digital records for seeds and fertilizers.",
    },
    {
      title: "Sharecropping",
      desc: "Worker/Partner: Easily manage workers on share-basis (1/4th, 1/5th). Calculate their exact share from the total harvest after deducting expenses accurately. No more manual share-basis confusion.",
    },
    {
      title: "Labor & Custom Hiring",
      desc: "Track daily wages for casual labor and hiring costs for tractors or harvesters. Easily manage multiple workers and machine operators without any manual paperwork. Real-time labor tracking.",
    },
    {
      title: "Farm P&L Tracker",
      desc: "Total income minus all expenses. Get a clear picture of your seasonal savings or losses instantly with built-in automatic interest calculation for every transaction. Digital Profit and Loss tracking.",
    },
  ];

  // CSS Animation for Vertical Scroll
  const scrollKeyframes = `
    @keyframes scrollInsideCard {
      0% { transform: translateY(0); }
      100% { transform: translateY(-50%); }
    }
  `;

  const styles = {
    wrapper: {
      backgroundColor: "#f3d0da",
      minHeight: "100vh",
      width: "100%",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      paddingBottom: "50px",
    },
    header: {
      backgroundColor: "#a3518f",
      color: "white",
      textAlign: "center",
      padding: "60px 20px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    mainGrid: {
      display: "grid",
      // Responsive Grid: Mobile pe 1, Desktop pe 4 columns
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "25px",
      maxWidth: "1300px",
      margin: "50px auto",
      padding: "0 20px",
    },
    card: {
      height: "350px", // Fixed card height
      display: "flex",
      flexDirection: "column",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      backgroundColor: "#a3518f", // Dark background for the body
    },
    cardHeader: {
      backgroundColor: "#e56b5f",
      color: "white",
      padding: "15px",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "20px",
      borderBottom: "2px solid rgba(255,255,255,0.1)",
      zIndex: 10,
    },
    scrollArea: {
      flex: 1,
      overflow: "hidden", // Scroll hone wala text bahar na dikhe
      padding: "20px",
      position: "relative",
    },
    movingContent: {
      color: "white",
      fontSize: "17px",
      lineHeight: "1.8",
      animation: "scrollInsideCard 15s linear infinite",
      cursor: "pointer",
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

  return (
    <div style={styles.wrapper}>
      {/* Vite/React ke liye CSS inject karna */}
      <style>{scrollKeyframes}</style>

      {/* Hero Header */}
      <header style={styles.header}>
        <h1 style={{ fontSize: "3rem", margin: 0, letterSpacing: "2px" }}>
          FARMER-ACCOUNTANT
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            fontStyle: "italic",
            marginTop: "10px",
            opacity: 0.9,
          }}>
          Farming accounts, now digital and easy.
        </p>
      </header>

      {/* Cards Section */}
      <div style={styles.mainGrid}>
        {features.map((item, index) => (
          <div key={index} style={styles.card}>
            {/* Static Header */}
            <div style={styles.cardHeader}>{item.title}</div>

            {/* Scrolling Content Area */}
            <div style={styles.scrollArea}>
              <div
                style={styles.movingContent}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.animationPlayState = "paused")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.animationPlayState = "running")
                }>
                {/* Same text twice for seamless infinite loop */}
                <p style={{ marginBottom: "40px" }}>{item.desc}</p>
                <p>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footerBar}></div>
    </div>
  );
};

export default DashBord;
