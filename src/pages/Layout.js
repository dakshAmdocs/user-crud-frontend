import { Outlet, Link } from "react-router-dom";
import Appbar from "../components/Appbar";
import { Stack } from "@mui/material";

const Layout = () => {
  return (
    <Stack spacing={5} >

      <Appbar/>
      <Outlet />
    </Stack>
  )
};

export default Layout;