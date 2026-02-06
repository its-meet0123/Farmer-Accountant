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
          width: "fit-content",
          height: screen.md ? "40px" : "34px",
          alignItems: "center",
          margin: "20px 10px 20px 0px",
          padding: "2px",
          borderRadius: "10px",
          fontWeight: "bold",
          backgroundColor: "#FCF5EE",
        }}>
        <Avatar size={screen.md ? 24 : 18} icon={<UserOutlined />} />
        <p
          style={{
            fontSize: screen.md ? 14 : 8,
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
