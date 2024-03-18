import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLogin } from "../../features/loginSlice";

export const AppLayout = () => {
  const { isLogin } = useSelector(selectLogin);

  return (
    <>
      {isLogin ? (
        <div>
          <Box sx={{ width: "100%" }}>
            <Sidebar />
            <Box
              sx={{
                flexGrow: 1,
                marginLeft: "250px",
                minHeight: "100vh",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
