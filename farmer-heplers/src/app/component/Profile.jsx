//import { UserOutlined } from "@ant-design/icons";
//import { Avatar, Flex } from "antd";

const Profile = ({ userName, screen }) => {
  const firstName = userName?.firstName
    ? userName.firstName.toUpperCase()
    : "?";
  const firstLetter = firstName.charAt(0) || "?";
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "6px 16px",
          // Glassmorphism Look (Site ke gradient ke saath match karega)
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "50px", // Capsule shape
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        // Hover effect ke liye (Agar aap desktop par hain)
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
        }>
        {/* Avatar Section */}
        <div
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4da3ff 0%, #61daf b 100%)", // Blue gradient avatar
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.5)",
          }}>
          {firstLetter}
        </div>

        {/* Name Section */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              display: screen.md ? "block" : "none",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              lineHeight: "1.2",
            }}>
            {userName.firstName} {userName.lastName}
          </span>
          {/* <span style={{ 
      color: "rgba(255, 255, 255, 0.6)", 
      fontSize: "10px",
      textTransform: "uppercase" 
    }}>
      Admin
    </span> */}
        </div>
      </div>
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
