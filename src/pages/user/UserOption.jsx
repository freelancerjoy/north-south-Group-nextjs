/* eslint-disable react/prop-types */
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import img from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth/authStore.jsx";

const UserOption = ({ user }) => {
  const navigateTo = useNavigate();
  const [open, setOpen] = useState(false);
  const { logoutUser } = useAuthStore();


  const options = [
    {
      icon: <PersonIcon />,
      name: "Profile",
      func: accoutFunction,
    },
    {
      icon: <LogoutIcon />,
      name: "Logout",
      func: logoutFunction,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Admin",
      func: dashboard,
    });
  }

  function dashboard() {
    navigateTo("dashboard");
  }
  function accoutFunction() {
    navigateTo("profile");
  }
  function logoutFunction() {
  logoutUser();
  }

  return (
    <>
    <Box
    className="imgicon"
      display="flex"
      justifyContent="right"
      position="absolute"
      top={12}
      right={10}
    >
      <SpeedDial
       className="imgicon"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex:30 , height: 5 }}
        open={open}
        direction="down"
        FabProps={{ size: "small", style: { backgroundColor: "#2D2727",width: 35 } }}
        icon={<img className="speedDialIcon" src={img} alt="Profile" />}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
      {/* <Box>
        jnjbjhb:{user.name}
      </Box> */}
    </Box>
    </>
  );
};

export default UserOption;
