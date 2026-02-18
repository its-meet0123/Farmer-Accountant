import { Grid, Layout, Menu, message, theme } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Profile from "./Profile";
import UserActionModel from "./UserIdActionModel";

import LanguageChangeDropDown from "./LanguageChangeDropdown";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

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
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const Menus = [
    getItem(`${t("layout.menu.home")}`, "/home"),
    getItem(`${t("layout.menu.view")}`, "/view"),
    getItem(`${t("layout.menu.worker")}`, "/worker"),
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
        message.info(
          `User : ${authState.user.userName.firstName} ${authState.user.userName.lastName} logout `,
        );
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
    <Layout
      style={{
        height: screen.md ? "100%" : "200%",
        width: screen.md ? "100%" : "70%",
      }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        {authState.isLoggedIn && (
          <Profile userName={authState.user.userName} screen={screen} />
        )}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={pathname}
          items={Menus}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => {
            openMenus(key);
          }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {`${t("layout.ft1")} ©${new Date().getFullYear()} ${t("layout.ft2")}`}
      </Footer>
      <UserActionModel
        openType={openType}
        setOpenType={setOpenType}
        user={authState.user}
        goToSingUp={goToSingUp}
      />
    </Layout>
  );
};
export default AppLayout;
