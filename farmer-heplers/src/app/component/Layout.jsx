import { Grid, Layout, Menu, message, theme } from "antd";
import { useEffect, useState } from "react";
import { moreMenu, primeryMenu } from "../constant/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Profile from "./Profile";
import UserActionModel from "./UserIdActionModel";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { authState, logout, goToSingUp } = useAuth();
  const location = useLocation();
  const screen = useBreakpoint();
  const navigate = useNavigate();
  const [openType, setOpenType] = useState(null);
  const [pathname, setPathname] = useState(location.pathname);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const Menu = [
    getItem(`Home`, "/home"),
    getItem(`View`, "/view"),
    getItem("Worker", "/worker"),
    getItem("Setting", "/setting", [
      getItem("Logout", "/logout"),
      getItem("Delete", "/delete"),
    ]),
  ];

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const openMenus = (key) => {
    if (key === "/setting" || key === "/delete" || key === "/logout") {
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
          items={Menu}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => {
            openMenus(key);
          }}
        />
        <LanguageChangeDropDown />
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
        Farmer Accountant ©{new Date().getFullYear()} Created by Sukh Ramghria
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
