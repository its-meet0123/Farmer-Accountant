import { Avatar, Grid, Space, Tooltip, Typography } from "antd";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const Profile = ({ userName }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md && screens.xs;

  const Name = userName?.firstName
    ? `${userName.firstName} ${userName.lastName}`
    : "NO Name";
  const firstLetter = userName?.firstName.chartAt(0).toUpperCase();
  return (
    <>
      <Space size={12} style={{ cursor: "pointer" }}>
        <Tooltip
          title={`${userName?.firstName} ${userName?.lastName}`}
          placement="bottom"
          color="#1e293b"></Tooltip>
        <Avatar
          size={40}
          style={{
            background: "linear-gradient(135deg, #4da3ff 0%, #005bc5 100%)",
            border: "2px solid rgba(255,255,255,0.3)",
            fontWeight: "bold",
            fontSize: "18px",
            marginRight: isMobile && "5px",
          }}>
          {firstLetter}
        </Avatar>
        {!isMobile && (
          <div
            style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <Text style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>
              {Name}
            </Text>
            {/* <Text
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "10px",
                marginTop: "2px",
              }}>
              ADMIN
            </Text> */}
          </div>
        )}
      </Space>
    </>
  );
};

export default Profile;

// <Flex
//       gap="2px"
//       horizontal
//       style={{
//         color: "#222222",
//         border: "5px ",
//         width: "fit-content",
//         height: screen.md ? "40px" : "34px",
//         alignItems: "center",
//         margin: "20px 10px 20px 0px",
//         padding: "2px",
//         borderRadius: "10px",
//         fontWeight: "bold",
//         backgroundColor: "#FCF5EE",
//       }}>
//       <Avatar size={screen.md ? 24 : 18} icon={<UserOutlined />} />
//       <p
//         style={{
//           fontSize: screen.md ? 14 : 8,
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           whiteSpace: "nowrap",
//         }}>
//         {userName.firstName} {userName.lastName}
//       </p>
//     </Flex>
