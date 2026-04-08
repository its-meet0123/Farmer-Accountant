import { useEffect, useMemo, useState } from "react";

import { getDashbordData, getMonthlyTurnover } from "../../service/dashbord";
import { Card, message } from "antd";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { styles } from "./DasnbordStyle";
import FeatureCard from "./FeatureCard";
import TurnoverGraph from "../graph/MonthlyTurnover";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const DashBord = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [dashbordData, setDeshbordData] = useState({});
  const [monthlyTotal, setMonthlyTotal] = useState([]);
  const { t } = useAuth();

  const shopesArray = dashbordData?.shopes || [];
  const permanentWorkersArray = dashbordData?.workers || [];
  const casualLaborsArray = dashbordData?.casualLabors || [];
  const harvestersArray = dashbordData?.harvesters || [];

  const getDashbordDataFromApi = async () => {
    const res = await getDashbordData();
    const data = await res.data;
    if (data.status == "Success") {
      setDeshbordData(data.data);
      message.success(t(data.Code));
    }
  };

  const getMonthlyTurnoverData = async () => {
    setIsLoading(true);
    const res = await getMonthlyTurnover();
    const data = await res.data;
    if (data.status == "Success") {
      setMonthlyTotal(data.data);
      message.success(data.Code);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        getDashbordDataFromApi();
        getMonthlyTurnoverData();
      } catch (err) {
        console.error("Error message:", err.message);
        message.error(t("DB.SEM"));
      }
    }
    getData();
  }, [location.pathname]);

  const features = [
    {
      title: t("dashbord.features.tfs"),
      path: "/home",
      desc:
        shopesArray.length > 0
          ? shopesArray.map((shop) => ({
              name: shop.shopeNumber || "",
              total: shop.overAllTotal || 0,
              accountAge: shop.accountAge || 0,
              isEmpty: false,
            }))
          : [
              {
                isEmpty: true,
                name: t("dashbord.features.dtfs2") || "A",
                total: 0,
              },
            ],
    },
    {
      title: t("dashbord.features.tfpw"),
      path: "/worker",
      desc:
        permanentWorkersArray.length > 0
          ? permanentWorkersArray.map((worker) => ({
              name: worker.workerName || "",
              total: worker.overAllTotal || 0,
              accountAge: worker?.accountAge || 0,
              isEmpty: false,
            }))
          : [
              {
                isEmpty: true,
                name: t("dashbord.features.dtfpw2") || "B",
                total: 0,
              },
            ],
    },
    {
      title: t("dashbord.features.tfcl"),
      path: "/other/labor",
      desc:
        casualLaborsArray.length > 0
          ? casualLaborsArray.map((labor) => ({
              name: labor.laborName || "",
              total: labor.pending || 0,
              accountAge: labor?.accountAge || 0,
              isEmpty: false,
            }))
          : [
              {
                isEmpty: true,
                name: t("dashbord.features.dtfcl2") || "C",
                total: 0,
              },
            ],
    },
    {
      title: t("dashbord.features.tfhl"),
      path: "/other/mechanized",
      desc:
        harvestersArray.length > 0
          ? harvestersArray.map((harvest) => ({
              name: harvest.opratorName || "",
              total: harvest.pending || 0,
              accountAge: harvest?.accountAge || 0,
              isEmpty: false,
            }))
          : [
              {
                isEmpty: true,
                name: t("dashbord.features.dtfhl2") || "D",
                total: 0,
              },
            ],
    },
  ];

  const overAllTotal = useMemo(() => {
    return monthlyTotal.reduce((acc, curr) => acc + (curr.grandTotal || 0), 0);
  }, [monthlyTotal]);

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>
          {t("dashbord.features.tfdh1")}-
          <span style={{ color: "#4da3ff" }}>
            {t("dashbord.features.tfdh2")}
          </span>
        </h1>
        <p style={styles.headerSubtitle}>{t("dashbord.features.stfdh")}</p>
      </header>

      <div style={styles.mainGrid}>
        {features.map((item, index) => (
          <FeatureCard key={index} item={item} isLoading={isLoading} />
        ))}
      </div>
      {!isLoading && (
        <Card
          title={<span style={{ color: "#4da3ff" }}>Turnover Graph</span>}
          extra={
            overAllTotal > 0 ? (
              <span
                style={{
                  color: "green",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                }}>
                Profit: {formatCurrency(overAllTotal)}
              </span>
            ) : overAllTotal < 0 ? (
              <span
                style={{
                  color: "red",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                }}>
                Loss: {formatCurrency(overAllTotal)}
              </span>
            ) : (
              <span
                style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 600 }}>
                {formatCurrency(0)}
              </span>
            )
          }
          style={{
            width: "100%",
            height: 600,
            backgroundColor: "#161d2f",
            marginTop: "20px",
            color: "#ffffff",
            overflow: "hidden",
          }}
          styles={{
            body: {
              overflowX: "auto",
              width: "100%",
              height: "calc(600px-57px)",
            },
          }}>
          <TurnoverGraph turnover={monthlyTotal} />
        </Card>
      )}
      <div style={styles.footerBar}></div>
    </div>
  );
};

export default DashBord;
