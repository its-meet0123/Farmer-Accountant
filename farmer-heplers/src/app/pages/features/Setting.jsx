import {
  LogoutOutlined,
  SettingOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Dropdown, Flex, message } from "antd";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import UserActionModel from "../../component/UserIdActionModel";

const items = [
  {
    label: "Log Out",
    key: "1",
    icon: <LogoutOutlined />,
  },
  {
    label: "Delete Account",
    key: "2",
    icon: <UserDeleteOutlined />,
  },
];

const Setting = () => {
  const { logout, authState } = useAuth();
  const [openType, setOpenType] = useState(null);

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      logout();
      message.info(
        `User : ${authState.user.userName.firstName} ${authState.user.userName.lastName} logout `,
      );
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
