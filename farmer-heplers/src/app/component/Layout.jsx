import { Grid, Layout, Menu, message, theme } from "antd";
import { useEffect, useState } from "react";
import { moreMenu, primeryMenu } from "../constant/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Profile from "./Profile";
import UserActionModel from "./UserIdActionModel";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;
const Menus = [...primeryMenu, ...moreMenu];

const AppLayout = ({ children }) => {
  const { authState, logout } = useAuth();
  const location = useLocation();
  const screen = useBreakpoint();
  const navigate = useNavigate();
  const [openType, setOpenType] = useState(null);
  const [pathname, setPathname] = useState(location.pathname);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (pathname !== "/") {
      setPathname(location.pathname);
    } else {
      setPathname("/home");
    }
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
        {authState.isLoggedIn && <Profile userName={authState.user.userName} />}
        (
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
        )
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
        logout={logout}
      />
    </Layout>
  );
};
export default AppLayout;
