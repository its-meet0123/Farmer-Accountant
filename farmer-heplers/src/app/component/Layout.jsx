import { Grid, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Profile from "./Profile";
import UserActionModel from "./UserIdActionModel";
import LanguageChangeDropDown from "./LanguageChangeDropdown";
import LayoutFooter from "./subcomponent/LayoutFooter";
import { footerstyles } from "./subcomponent/FooterStyles.js";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;
const isMobile = !screen.md;

function getItem(label, key, children, icon) {
  return {
    label,
    key,
    children,
    icon,
  };
}

const AppLayout = ({ children }) => {
  const { authState, logout, goToSingUp, t, season } = useAuth();
  const location = useLocation();
  const screen = useBreakpoint();
  const navigate = useNavigate();
  const [openType, setOpenType] = useState(null);
  const [pathname, setPathname] = useState(location.pathname);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const Menus = [
    getItem(`${t("season.text")}`, "/season"),
    getItem(`${t("layout.menu.home")}`, "/home"),
    getItem(`${t("layout.menu.view")}`, "/view"),
    getItem(`${t("layout.menu.worker")}`, "/worker"),
    getItem(`${t("layout.menu.othert")}`, "/other", [
      getItem(`${t("layout.menu.other.labor")}`, "/other/labor"),
      getItem(`${t("layout.menu.other.hiring")}`, "/other/mechanized"),
    ]),
    getItem(`${t("layout.menu.setting")}`, "/setting", [
      getItem(`${t("layout.menu.logout")}`, "/logout"),
      getItem(`${t("layout.menu.delete")}`, "/delete"),
      getItem(<LanguageChangeDropDown color="purple" />, "/lang"),
    ]),
  ];

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const openMenus = (key) => {
    if (
      key === "/setting" ||
      key === "/delete" ||
      key === "/logout" ||
      key === "/lang"
    ) {
      if (key === "/logout") {
        logout();
      }
      if (key === "/delete") {
        setOpenType("delete");
      }
    } else {
      navigate(key);
    }
  };
  const startYear = new Date(season?.startDate).getFullYear();
  const endYear = new Date(season?.endDate).getFullYear();

  const sessionYear =
    startYear == endYear
      ? season?.year
      : `${startYear}-${String(endYear).slice(-2)}`;

  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        {authState.isLoggedIn && (
          <Profile userName={authState.user.userName} screen={screen} />
        )}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          items={Menus}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => {
            openMenus(key);
          }}
        />

        <div
          style={{
            marginLeft: "auto",
            color: "#fff",
            fontWeight: 500,
            textAlign: "right",
          }}>
          {!season.name && "No Season"}

          {season?.name && season?.startDate && season?.endDate && (
            <>
              {/* Season Name (Rabi/Sauni) */}
              {season?.name === "Rabi"
                ? t("season.modal.sort")
                : t("season.modal.sokt")}
              {" ("}
              {/* Start Date */}
              {new Date(season?.startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
              {" - "}
              {/* End Date */}
              {new Date(season?.endDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
              ,{sessionYear}
            </>
          )}
        </div>
      </Header>
      <Content
        style={{
          minHeight: "100vh",
        }}>
        <div
          style={{
            // background: colorBgContainer,
            minHeight: 280,
            // padding: 24,
            borderRadius: borderRadiusLG,
          }}>
          {children}
        </div>
      </Content>
      <Footer style={footerstyles.container}>
        <LayoutFooter t={t} />
      </Footer>
      <UserActionModel
        openType={openType}
        setOpenType={setOpenType}
        user={authState.user}
        goToSingUp={goToSingUp}
        t={t}
      />
    </Layout>
  );
};
export default AppLayout;
