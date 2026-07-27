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
  const [seasonHovered, setSeasonHovered] = useState(false);
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

  //Styles

  const layoutStyle = {
    width: "100%",
    minHeight: "100vh",
    background: "#0f172a", // Dark modern backdrop
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    background: "rgba(15, 23, 42, 0.85)", // Sleek Dark Glassmorphism
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: "68px",
    gap: "16px",
    flexWrap: "wrap",
  };

  const menuStyle = {
    flex: 1,
    minWidth: 0,
    background: "transparent",
    borderBottom: "none",
    fontSize: "15px",
    fontWeight: "500",
  };

  // Season Pill Badge Styles
  const seasonBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "2px 14px",
    borderRadius: "20px",
    background: seasonHovered
      ? "rgba(56, 189, 248, 0.2)"
      : "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(56, 189, 248, 0.3)",
    color: "#f8fafc",
    fontSize: "13px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",
    cursor: "default",
    boxShadow: seasonHovered ? "0 0 12px rgba(56, 189, 248, 0.3)" : "none",
  };

  const activeDotStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: season?.name ? "#10b981" : "#f59e0b", // Green if active, Amber if no season
    boxShadow: season?.name ? "0 0 8px #10b981" : "0 0 8px #f59e0b",
  };

  const contentStyle = {
    minHeight: "calc(100vh - 136px)",
    padding: "24px",
  };

  const innerContentStyle = {
    minHeight: 280,
    borderRadius: borderRadiusLG || "16px",
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        {/* Profile Component */}
        {authState?.isLoggedIn && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "12px",
            }}>
            <Profile userName={authState.user.userName} screen={screen} />
          </div>
        )}

        {/* Navigation Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          items={Menus}
          style={menuStyle}
          onClick={({ key }) => {
            openMenus(key);
          }}
        />

        {/* Season Info Badge */}
        <div
          style={seasonBadgeStyle}
          onMouseEnter={() => setSeasonHovered(true)}
          onMouseLeave={() => setSeasonHovered(false)}>
          <span style={activeDotStyle}></span>

          {!season?.name && <span style={{ color: "#cbd5e1" }}>No Season</span>}

          {season?.name && season?.startDate && season?.endDate && (
            <span>
              <strong style={{ color: "#38bdf8", marginRight: "4px" }}>
                {season?.name === "Rabi"
                  ? t("season.modal.sort")
                  : t("season.modal.sokt")}
              </strong>
              <span style={{ opacity: 0.9 }}>
                (
                {new Date(season?.startDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
                {" - "}
                {new Date(season?.endDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
                , {sessionYear})
              </span>
            </span>
          )}
        </div>
      </Header>

      {/* Main Page Content */}
      <Content style={contentStyle}>
        <div style={innerContentStyle}>{children}</div>
      </Content>

      {/* Footer */}
      <Footer
        style={
          footerstyles?.container || {
            textAlign: "center",
            background: "#0f172a",
          }
        }>
        <LayoutFooter t={t} />
      </Footer>

      {/* User Action Modal */}
      <UserActionModel
        openType={openType}
        setOpenType={setOpenType}
        user={authState?.user}
        goToSingUp={goToSingUp}
        t={t}
      />
    </Layout>
  );
};
export default AppLayout;
