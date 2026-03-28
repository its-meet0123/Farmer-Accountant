import { useEffect, useState } from "react";

import { getDashbordData } from "../../service/dashbord";
import { message } from "antd";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { styles } from "./DashboardStyles";

const DashBord = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [dashbordData, setDeshbordData] = useState({});
  const { t } = useAuth();

  const shopesArray = dashbordData?.shopes || [];
  const permanentWorkersArray = dashbordData?.workers || [];
  const casualLaborsArray = dashbordData?.casualLabors || [];
  const harvestersArray = dashbordData?.harvesters || [];

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await getDashbordData();
        const data = await res.data;
        setDeshbordData(data.data);
        message.success(data.Code);
        setIsLoading(false);
      } catch (err) {
        console.error("Error message:", err.message);
        message.error("Dashbord data not fetched");
      }
    }
    getData();
  }, [location.pathname, t]);

  const features = [
    {
      title: "Shops & Inventory",
      path: "/home",
      desc:
        shopesArray.length > 0
          ? shopesArray.map((shop) => ({
              name: shop.shopeNumber || "",
              total: shop.overAllTotal || 0,
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
      title: "Permanent Workers",
      path: "/worker",
      desc:
        permanentWorkersArray.length > 0
          ? permanentWorkersArray.map((worker) => ({
              name: worker.workerName || "",
              total: worker.overAllTotal || 0,
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
      title: "Casual Labor",
      path: "/other/labor",
      desc:
        casualLaborsArray.length > 0
          ? casualLaborsArray.map((labor) => ({
              name: labor.laborName || "",
              total: labor.pending || 0,
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
      title: "Harvester & Tools",
      path: "/other/mechanized",
      desc:
        harvestersArray.length > 0
          ? harvestersArray.map((harvest) => ({
              name: harvest.opratorName || "",
              total: harvest.pending || 0,
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
          FARMER-<span style={{ color: "#4da3ff" }}>ACCOUNTANT</span>
        </h1>
        <p style={styles.headerSubtitle}>
          Cultivating growth through organized farm accounting.
        </p>
      </header>

      <div style={styles.mainGrid}>
        {features.map((item, index) => (
          <FeatureCard key={index} item={item} isLoading={isLoading} />
        ))}
      </div>

      <div style={styles.footerBar}></div>
    </div>
  );
};

// const FeatureCard = ({ item, isLoanding }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Strict validation: ensure item.desc is always an array
//   const descArray = Array.isArray(item?.desc) ? item.desc : [];

//   const hasMultipleDesc = descArray.length > 1;

//   useEffect(() => {
//     if (hasMultipleDesc) {
//       const timer = setInterval(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === descArray.length - 1 ? 0 : prevIndex + 1,
//         );
//       }, 2000);

//       return () => clearInterval(timer);
//     }
//   }, [hasMultipleDesc, descArray.length]);

//   // Guard check after hooks - don't render if invalid item
//   if (!item || typeof item !== "object") {
//     return null;
//   }

//   return (
//     <div style={styles.card}>
//       <div style={styles.cardHeader}>{item.title}</div>
//       {isLoanding ? (
//         <Spin indicator={<LoadingOutlined spin />} size="small" />
//       ) : (
//         <div style={styles.scrollArea}>
//           <div
//             style={{
//               display: "flex",
//               width: `${descArray.length * 100}%`,
//               transform: `translateX(-${(currentIndex * 100) / descArray.length}%)`,
//               //transform: `translateX(-${currentIndex * 100}%)`,
//               transition: hasMultipleDesc
//                 ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
//                 : "none",
//               height: "100%",
//             }}>
//             {descArray.map((data, i) => (
//               <div
//                 key={i}
//                 style={{
//                   ...styles.descSlide,
//                   width: `${100 / descArray.length}%`,
//                 }}>
//                 <div style={styles.contentBox}>
//                   <p
//                     style={{
//                       ...styles.dataName,
//                       // Agar text bada hai toh size 1.1rem ya 1.2rem rakhein
//                       fontSize: data.isEmpty ? "1.15rem" : "1.4rem",
//                       fontWeight: data.isEmpty ? "400" : "600",
//                       color: "#ffffff",
//                       opacity: data.isEmpty ? 0.7 : 1,
//                       lineHeight: "1.6", // Lines ke beech gap taaki padhne mein aasaan ho
//                       textAlign: "center",
//                       margin: "0 auto",
//                       maxWidth: "90%", // Side se thoda gap chhoda hai
//                       wordBreak: "break-word", // Badi lines ko automatic wrap karega
//                     }}>
//                     {data?.name || "N/A"}
//                   </p>

//                   {!data.isEmpty && (
//                     <div style={styles.amountBadge}>{data?.total}</div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {hasMultipleDesc && (
//         <div style={styles.dotsContainer}>
//           {descArray.map((_, i) => (
//             <div
//               key={i}
//               style={{
//                 ...styles.dot,
//                 width: currentIndex === i ? "20px" : "6px",
//                 opacity: currentIndex === i ? 1 : 0.4,
//                 backgroundColor: "#4da3ff", // Light blue dots
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export default DashBord;
