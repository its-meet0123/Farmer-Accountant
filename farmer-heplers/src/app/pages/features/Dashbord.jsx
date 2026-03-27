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
      desc: "Track all your purchases from seed and fertilizer stores. Keep your credits and payments clear with every trader. Manage daily khata for all your trusted vendors in one place.",
    },
    {
      title: "Sharecropping",
      desc: "Worker/Partner: Easily manage workers on share-basis (1/4th, 1/5th). Calculate their exact share from the total harvest after deducting expenses accurately.",
    },
    {
      title: "Labor & Custom Hiring",
      desc: "Track daily wages for casual labor and hiring costs for tractors or harvesters. Easily manage multiple workers and machine operators without any manual paperwork.",
    },
    {
      title: "Farm P&L Tracker",
      desc: "Total income minus all expenses. Get a clear picture of your seasonal savings or losses instantly with built-in automatic interest calculation for every transaction.",
    },
  ];

  // Vertical Scroll Animation
  const verticalScroll = `
    @keyframes scrollText {
      0% { transform: translateY(0); }
      100% { transform: translateY(-50%); }
    }
  `;

  const styles = {
    container: {
      backgroundColor: "#f3d0da",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    header: {
      backgroundColor: "#a3518f",
      color: "white",
      textAlign: "center",
      padding: "40px 20px",
      marginBottom: "40px",
      borderRadius: "8px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    card: {
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      backgroundColor: "white",
      height: "300px", // Fixed height for cards
      display: "flex",
      flexDirection: "column",
    },
    cardHeader: {
      backgroundColor: "#e56b5f",
      color: "white",
      textAlign: "center",
      padding: "15px",
      fontSize: "18px",
      fontWeight: "bold",
      zIndex: 2,
    },
    cardBodyContainer: {
      backgroundColor: "#a3518f",
      flex: 1,
      overflow: "hidden", // Bahar ka data chhupane ke liye
      position: "relative",
      padding: "20px",
    },
    scrollingText: {
      color: "white",
      fontSize: "16px",
      lineHeight: "1.6",
      display: "block",
      animation: "scrollText 10s linear infinite", // Vertical scroll
    },
  };

  return (
    <div style={styles.container}>
      <style>{verticalScroll}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={{ margin: 0, fontSize: "36px" }}>FARMER-ACCOUTANT</h1>
        <p style={{ fontStyle: "italic", textDecoration: "underline" }}>
          Farming accounts, now digital and easy.
        </p>
      </div>

      {/* Static Cards Grid */}
      <div style={styles.grid}>
        {features.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.cardHeader}>{item.title}</div>

            <div style={styles.cardBodyContainer}>
              {/* Is div ke andar ka text move karega */}
              <div
                style={styles.scrollingText}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.animationPlayState = "paused")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.animationPlayState = "running")
                }>
                <p>{item.desc}</p>
                <br />
                {/* Duplicate text taaki loop infinite lage */}
                <p>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          height: "8px",
          backgroundColor: "#e56b5f",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}></div>
    </div>
  );
};

export default DashBord;
