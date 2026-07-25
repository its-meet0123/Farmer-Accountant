import { useEffect, useMemo, useState } from "react";

import { getDashbordData, getMonthlyTurnover } from "../../service/dashbord";
import { Card, message } from "antd";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { styles } from "./DasnbordStyle";
import FeatureCard from "./FeatureCard";
import TurnoverGraph from "../graph/MonthlyTurnover";
import DashbordInfo from "./Info";
import Expense from "./Expenses";

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
  const [dashbordData, setDeshbordData] = useState();
  const [monthlyTotal, setMonthlyTotal] = useState([]);
  const { season, t } = useAuth();
  console.log("lget season in dashboard :", season);
  const shopesArray = dashbordData?.shopes || [];
  const permanentWorkersArray = dashbordData?.workers || [];
  const casualLaborsArray = dashbordData?.casualLabors || [];
  const harvestersArray = dashbordData?.harvesters || [];

  const getDashbordDataFromApi = async () => {
    const res = await getDashbordData(season?._id);
    const data = await res.data;
    console.log("dashboard data in new format", data);
    if (data.status == "Success") {
      setDeshbordData(data.data);
      message.success(t(data.Code));
    }
  };

  const getMonthlyTurnoverData = async () => {
    setIsLoading(true);
    const res = await getMonthlyTurnover(season?._id);
    const data = await res.data;
    if (data.status == "Success") {
      setMonthlyTotal(data.data);
      message.success(data.Code);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!season?._id) return;

    async function getData() {
      try {
        await Promise.all([getDashbordDataFromApi(), getMonthlyTurnoverData()]);
      } catch (err) {
        console.error("Error message:", err.message);
        message.error(t("DB.SEM"));
        if (err.code === "ERR_CANCELED") {
          return;
        }
      }
    }
    getData();
  }, [location.pathname, season?._id]);

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

      {dashbordData == null ? (
        <DashbordInfo />
      ) : (
        <>
          {" "}
          <div style={styles.mainGrid}>
            {features.map((item, index) => (
              <FeatureCard
                key={index}
                item={item}
                isLoading={isLoading}
                season={season}
              />
            ))}
          </div>
          {!isLoading && (
            <>
              <Card
                title={
                  <span
                    style={{
                      color: "#F8FAFC",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                    }}>
                    {t("dashbord.cards.card1title")}
                  </span>
                }
                style={{
                  width: "100%",
                  marginTop: "24px",

                  background:
                    "linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",

                  border: "1px solid rgba(255,255,255,.12)",

                  borderRadius: "24px",

                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",

                  boxShadow:
                    "0 12px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.05)",

                  overflow: "hidden",

                  color: "#fff",
                }}
                styles={{
                  header: {
                    background:
                      "linear-gradient(90deg, rgba(59,130,246,.12), rgba(6,182,212,.10))",

                    borderBottom: "1px solid rgba(255,255,255,.08)",

                    minHeight: 65,
                  },

                  body: {
                    padding: 20,
                  },
                }}>
                <Expense data={dashbordData} />
              </Card>
              <Card
                title={
                  <span
                    style={{
                      color: "#F8FAFC",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      letterSpacing: ".5px",
                    }}>
                    {t("dashbord.cards.card2title")}
                  </span>
                }
                extra={
                  overAllTotal > 0 ? (
                    <span
                      style={{
                        background: "rgba(34,197,94,.15)",
                        color: "#22c55e",
                        padding: "8px 16px",
                        borderRadius: "30px",
                        fontWeight: 700,
                        fontSize: "1rem",
                        border: "1px solid rgba(34,197,94,.3)",
                      }}>
                      📈 Profit : {formatCurrency(overAllTotal)}
                    </span>
                  ) : overAllTotal < 0 ? (
                    <span
                      style={{
                        background: "rgba(239,68,68,.15)",
                        color: "#ef4444",
                        padding: "8px 16px",
                        borderRadius: "30px",
                        fontWeight: 700,
                        fontSize: "1rem",
                        border: "1px solid rgba(239,68,68,.3)",
                      }}>
                      📉 Loss : {formatCurrency(overAllTotal)}
                    </span>
                  ) : (
                    <span
                      style={{
                        background: "rgba(255,255,255,.08)",
                        color: "#F8FAFC",
                        padding: "8px 16px",
                        borderRadius: "30px",
                        fontWeight: 700,
                        fontSize: "1rem",
                      }}>
                      {formatCurrency(0)}
                    </span>
                  )
                }
                style={{
                  width: "100%",
                  height: 600,
                  marginTop: "24px",

                  background:
                    "linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",

                  border: "1px solid rgba(255,255,255,.12)",

                  borderRadius: "24px",

                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",

                  boxShadow:
                    "0 12px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.05)",

                  overflow: "hidden",

                  color: "#fff",
                }}
                styles={{
                  header: {
                    background:
                      "linear-gradient(90deg, rgba(59,130,246,.12), rgba(6,182,212,.10))",

                    borderBottom: "1px solid rgba(255,255,255,.08)",

                    minHeight: 70,

                    display: "flex",
                    alignItems: "center",
                  },

                  body: {
                    overflowX: "auto",
                    height: "calc(600px - 70px)",
                    padding: 20,
                  },
                }}>
                <TurnoverGraph turnover={monthlyTotal} />
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DashBord;
