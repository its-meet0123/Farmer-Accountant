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
      desc: "Track all your purchases from seed and fertilizer stores. Keep your credits and payments clear with every trader.",
    },
    {
      title: "Sharecropping",
      desc: "Worker/Partner: Easily manage workers on share-basis (1/4th, 1/5th). Calculate their exact share from the total harvest after deducting expenses.",
    },
    {
      title: "Labor & Custom Hiring",
      desc: "Track daily wages for casual labor and hiring costs for tractors or harvesters. Easily manage multiple workers and machine operators without any manual paperwork.",
    },
    {
      title: "Farm P&L Tracker",
      desc: "Total income minus all expenses. Get a clear picture of your seasonal savings or losses instantly with built-in automatic interest calculation.",
    },
  ];

  // Amazon style infinite scroll ke liye array ko double kar rahe hain
  const scrollData = [...features, ...features];

  // Inline Keyframes Styles (Browser mein inject karne ke liye)
  const scrollAnimation = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  const styles = {
    container: {
      backgroundColor: "#f3d0da",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
      overflowX: "hidden",
    },
    header: {
      backgroundColor: "#a3518f",
      color: "white",
      textAlign: "center",
      padding: "50px 20px",
    },
    title: {
      fontSize: "48px",
      margin: 0,
      fontWeight: "bold",
      letterSpacing: "2px",
    },
    subtitle: {
      fontSize: "20px",
      fontStyle: "italic",
      marginTop: "10px",
      textDecoration: "underline",
    },
    introSection: {
      maxWidth: "1000px",
      margin: "40px auto",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      gap: "30px",
      flexWrap: "wrap",
    },
    logoBox: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      flex: "1 1 300px",
    },
    introText: {
      flex: "2 1 400px",
      fontSize: "22px",
      color: "#a3518f",
      fontWeight: "600",
      lineHeight: "1.4",
    },
    scrollContainer: {
      width: "100%",
      overflow: "hidden",
      padding: "40px 0",
      position: "relative",
    },
    scrollWrapper: {
      display: "flex",
      width: "max-content",
      animation: "scroll 25s linear infinite",
    },
    card: {
      width: "350px",
      margin: "0 15px",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    },
    cardHeader: {
      backgroundColor: "#e56b5f",
      color: "white",
      textAlign: "center",
      padding: "15px",
      fontSize: "20px",
      fontWeight: "bold",
    },
    cardBody: {
      backgroundColor: "#a3518f",
      color: "white",
      padding: "25px",
      minHeight: "180px",
      fontSize: "15px",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.container}>
      {/* Injecting CSS Animation */}
      <style>{scrollAnimation}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>FARMER-ACCOUTANT</h1>
        <div style={styles.subtitle}>
          Farming accounts, now digital and easy.
        </div>
      </div>

      {/* Intro Section */}
      <div style={styles.introSection}>
        <div style={styles.logoBox}>
          <div
            style={{
              border: "4px solid #4caf50",
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <span style={{ color: "#2e7d32", fontWeight: "bold" }}>LOGO</span>
          </div>
          <h4 style={{ margin: "10px 0 0", color: "#2c4c64" }}>
            FARMER-ACCOUNTANT
          </h4>
          <p style={{ fontSize: "10px", color: "#666" }}>
            HISSAB BHI, KISAN BHI
          </p>
        </div>
        <div style={styles.introText}>
          Tired of lost notebooks and confusing calculations? Say goodbye to the
          old Bahi-Khata! Here is your smart, digital accountant to track every
          farm expense from seeds to harvest.
        </div>
      </div>

      {/* Amazon Style Auto-Scrolling Cards */}
      <div style={styles.scrollContainer}>
        <div
          style={styles.scrollWrapper}
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }>
          {scrollData.map((item, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardHeader}>{item.title}</div>
              <div style={styles.cardBody}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div
        style={{
          height: "10px",
          backgroundColor: "#e56b5f",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}></div>
    </div>
  );
};

export default DashBord;
