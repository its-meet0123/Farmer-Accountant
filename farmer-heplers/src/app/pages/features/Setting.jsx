import { LogoutOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import UserActionModel from "../../component/UserIdActionModel";

const Setting = () => {
  const { logout, authState, t } = useAuth();
  const [openType, setOpenType] = useState(null);

  const items = [
    {
      label: t("settingPage.logoutText"),
      key: "1",
      icon: <LogoutOutlined />,
    },
    {
      label: t("settingPage.deleteText"),
      key: "2",
      icon: <UserDeleteOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      logout();
      message.info(`${t("settingPage.logoutSuccess")}`);
    }

    if (e.key === "2") {
      setOpenType("delete");
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div>
        <Dropdown menu={menuProps} placement="bottomRight" trigger={["click"]}>
          Setting
        </Dropdown>
      </div>
      <UserActionModel
        openType={openType}
        setOpenType={setOpenType}
        user={authState.user}
        logout={logout}
      />
    </>
  );
};

export default Setting;
