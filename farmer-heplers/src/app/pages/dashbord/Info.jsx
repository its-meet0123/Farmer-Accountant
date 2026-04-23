import {
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddOutlined,
  QuestionCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { ArrowRight, HardHat, Pickaxe, Store, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const DashbordInfo = () => {
  return (
    <>
      <h3 style={{ color: "#faad14" }}>
        <ArrowRight /> Niche diye gaye vivran ko dhyanpurvak padhein.
      </h3>
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ margin: "0 0.2rem 0 0.2rem", gap: 2 }}>
        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <Store
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>Arhatiya (Bahi-Khata)</h3>
            <ul>
              <li>
                Arhatiya ka hisab kitab rkhne ka asaan trika Byaj aakln ke sath.
              </li>
              <li>
                Apna Bahi-Khata chalu krne ke liye{" "}
                <Link to="/home" style={{ fontSize: "16px" }}>
                  Traders
                </Link>{" "}
                per jaaye or Add Industry button per click krne per ik form open
                hoga useme Arhatiya ki jaankari fill kre.
              </li>
              <li>
                Form fill krne ke baad{" "}
                <Link to="/view">
                  <b>Vendors</b>
                </Link>{" "}
                per jaaye vaha aapko apne Arhatiya ki Shope Number waali list
                mil jaaye gi jiske Action columns mai{" "}
                <FileAddOutlined size={32} /> button per click kre ik or form
                opne hoga jis se apna lenn denn chaalu kre.
              </li>
              <li>
                Es form ke ander Rate/drr ya byaj dar 2 rupiya secda (2%) ke
                liye <b>24</b> daale. 1.5 rupiya secda (1.5%) ke liye <b>18</b>{" "}
                daale. 1 rupiya secda (1%) ke liye <b>12</b> daale.
              </li>
              <li>
                Form ke fields ko alg alg len den daalne ke trike se set kiya
                gya hai aap apne len den ke hisaab se bhr skte hai.
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <Pickaxe
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>Permanent Worker/Bantaidar</h3>
            <ul>
              <li>
                Bantaidar jo 5th ve hise ya 4th hisse per rkha jaata hai uske
                len den rkhne ke liye.
              </li>
              <li>
                Bantaidar ka len denn ke liye{" "}
                <Link to="/worker" style={{ fontSize: "16px" }}>
                  Permanent Worker
                </Link>{" "}
                per click kre or Add Worker button per click krne per ik form
                open hoga jisme Worker ki jaankari add kre.
              </li>
              <li>
                uske baad aapke paas worker ki list aa jaaye gi jisme action
                columns mai <FileAddOutlined size={32} /> button per click krne
                ke baad aapke pass len den add krne wala form open hoga. jiske
                uper guidline di gyi hai len den kaise add krnaa hai.
              </li>
              <li>
                Ager advance payment di jaati hai byaj per interest rate fild
                mai rate/drr vaise hi daale jo Arhatiya ke drr mai daali hai.
                ager nhi to <b>0</b> daal de
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <HardHat
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>Casual Labor/Dehadi Mazdoor</h3>
            <ul>
              <li>
                Dehadi Mazdoor ko Aniyamit time ke liye kam krta hai uska hisabb
                kitab rkhne ke liye.
              </li>
              <li>
                Dehadi Mazdoor add krne ke liye{" "}
                <Link to="/other/labor" style={{ fontSize: "16px" }}>
                  Casual Labor
                </Link>{" "}
                per click krne per aap labor nav mai jaaye ge yaha aapko{" "}
                <i>Add Labor</i> button per click krne per ik form open
                hoga.{" "}
              </li>
              <li>
                jisme aapko labor ki details daalni hogi or submit krne per
                table data mile ga jisme apke labor ki info hoogi uske action
                columns mai <FileAddOutlined size={32} /> button ko click krne
                per aapke paas len den form aa jaaye ga.
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ margin: "0 0.2rem 0 0.2rem", gap: 5 }}>
        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <Truck
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>
              Mechanized Hiring/Machinery Kiraya
            </h3>
            <ul>
              <li>Compains or tuddi repars ka len den rkhne ke liye.</li>
              <li>
                Len den shuru krne ke liye{" "}
                <Link to="/other/mechanized" style={{ fontSize: "16px" }}>
                  Mechanized Hiring
                </Link>{" "}
                per click krne per aap mechanized nav mai jaaye ge yaha aapko{" "}
                <i>New Harvest Entry</i> button per click krne per ik form open
                hoga.{" "}
              </li>
              <li>
                jisme aapko Oprator ja malik ki details daalni hogi or submit
                krne per table data mile ga jisme apke oprator ki info hoogi
                uske action columns mai <FileAddOutlined size={32} /> button ko
                click krne per aapke paas len den form aa jaaye ga.
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <QuestionCircleOutlined
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>Information/Jankari</h3>
            <ul>
              <li>
                Aapki nav ke hr traha ke len den ko manage krne ke liye tabs
                mojud hai jiske uses upr bta diye gye hai. ik <b>Setting</b> tab
                bhi hai jiske jriye aap apni language change kr skte hai or apna
                account delete kr skte hai
              </li>
              <li>
                Jab aap apna koi bhi len den shuru kre ge to aapka data sbse
                phle dashbord per moojud rhe ga jo aapke len den ka total
                category wise krta hai or monthly turnover garph mai bhi darsata
                hai.{" "}
              </li>
              <li>
                Vendors or Permanent Worker tabs mai aapko tables data ke Action
                Columns mai ik <EyeOutlined size={32} /> button mile gaa jispe
                click krne ke baad aap apni hr ik len den ka record check kr
                skte hai or uper diye gye <DownloadOutlined size={32} /> button
                per click krne per aap apna record download kr k rkh skte hai.
              </li>
              <li>
                Her ik len den ko edit delete kiya ja skta hai edit ke liye{" "}
                <EditOutlined size={32} /> button hr ik table row mai moojud
                rhta hai.
              </li>
              <li>
                Yehe sirf ik hisaab kitaab ki digital dairy hai. jise
                baahi-khata bola jaata hai.
              </li>
              <li>
                Esko use krne mai ja kisi bhi traha ki koi problem ho ja phir
                aap koi sujaav (Idea) denna ho to eske footer mai developer ke
                contanct moojud hai aap waha se contact kr skte hai (whatsApp
                icon ya Instagram icon per click krne per developer ki chat open
                hoggi).
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={glassStyle} hoverable>
            <WarningOutlined
              style={{
                fontSize: "32px",
                marginBottom: "15px",
                color: "#ffd700",
              }}
            />
            <h3 style={{ color: "#fff" }}>Warning/Chetavni</h3>
            <ul>
              <li>
                Setting se delete button per click krne ke baad aapke paas ik
                model open hoga jime ik <i>Ok</i> button per click krne per
                aapka account delete ho jaaye ga or sath hi saara data bhi
                delete hoga jise vaapis nhi laaya ja ske gaa
              </li>
              <li>
                Her ik Traders, Permanent Worker, Casual Labor, HarvesterList/
                Operator , ke samne moojud delete button per click krne per
                aapka us se smbdit saara len den delete ho jaaye ga.{" "}
              </li>
              <li>
                Casula Labor or Harvester ke len den mai agr aap ne kisi bhi
                transaction ko edit kiya to uske aage waali saari transaction ko
                edit krnaa jruri hai nhi to hisaab mai gadbad ho jaaye gi.(Ex.
                jaise maan lo aap ne 5 no transaction ko edit kiya to uske uper
                waali 6, 7 jitni bhi hoggi sb ko edit krna jruri hai.)
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashbordInfo;

const glassStyle = {
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(8.5px)",
  WebkitBackdropFilter: "blur(8.5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  color: "#fff",
};
