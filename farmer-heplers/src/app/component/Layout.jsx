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
  const { authState, logout, goToSingUp, t } = useAuth();
  const location = useLocation();
  const screen = useBreakpoint();
  const navigate = useNavigate();
  const [openType, setOpenType] = useState(null);
  const [pathname, setPathname] = useState(location.pathname);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const Menus = [
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
      getItem(<LanguageChangeDropDown />, "/lang"),
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

  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        {authState.isLoggedIn && (
          <Profile userName={authState.user.userName} screen={screen} />
        )}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          items={Menus}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => {
            openMenus(key);
          }}
        />
      </Header>
      <Content
        style={{
          padding: isMobile ? "10px" : "24px",
          margin: "0 auto",
          width: "100%",
          maxWidth: isMobile ? "100%" : "1400px",
        }}>
        <div
          style={{
            // background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            //       backgroundImage: `
            //   radial-gradient(circle at 10% 20%, rgba(4, 153, 169, 0.6) 0%, rgba(2, 63, 85, 0.9) 90%),
            //   radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.4) 0%, rgba(30, 27, 75, 1) 100%)
            // `,
          }}>
          {children}
        </div>
      </Content>
      <Footer style={footerstyles.container}>
        <LayoutFooter t={t} logout={logout} />
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
