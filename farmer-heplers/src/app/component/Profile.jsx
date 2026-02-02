import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex } from "antd";

const Profile = ({ userName, screen }) => {
  return (
    <>
      <Flex
        gap="small"
        horizontal
        style={{
          color: "#222222",
          border: "5px ",
          height: "40px",
          alignItems: "center",
          margin: "20px 10px 20px 0px",
          padding: "5px",
          borderRadius: "10px",
          fontWeight: "bold",
          backgroundColor: "#FCF5EE",
        }}>
        <Avatar size={24} icon={<UserOutlined />} />
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
          {userName.firstName} {userName.lastName}
        </p>
      </Flex>
    </>
  );
};

export default Profile;
