import { useEffect, useState } from "react";

import { getDashbordData, getMonthlyTurnover } from "../../service/dashbord";
import { message } from "antd";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { styles } from "./DasnbordStyle";
import FeatureCard from "./FeatureCard";
import TurnoverGraph from "../graph/MonthlyTurnover";

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
    setDeshbordData(data.data);
    message.success(t(data.Code));
  };

  const getMonthlyTurnoverData = async () => {
    const res = await getMonthlyTurnover();
    const data = await res.data;
    setMonthlyTotal(data.data);
    message.success(data.Code);
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        getDashbordDataFromApi();
        getMonthlyTurnoverData();
        setIsLoading(false);
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
      {!isLoading && <TurnoverGraph trunover={monthlyTotal} />}
      <div style={styles.footerBar}></div>
    </div>
  );
};

export default DashBord;
