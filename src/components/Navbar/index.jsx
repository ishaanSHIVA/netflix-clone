import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Buttton,
  Avatar,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles.js";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Sidebar from "../Sidebar";
import Search from "../Search";
import { createSessionId, fetchToken, moviesApi } from "../../utils/index.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../features/auth.js";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  console.log(user);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (id) {
          const { data: userData } = await moviesApi.get(
            "/account?session_id=" + id
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();

          const { data: userData } = await moviesApi.get(
            "/account?session_id=" + sessionId
          );

          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              className={classes.menuButton}
              onClick={() => setMobileOpen((prevState) => !prevState)}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div className="">
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => {}}
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={
                    "https://pixabay.com/vectors/avatar-icon-placeholder-facebook-1577909/"
                  }
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div className="">
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevState) => !prevState)}
              className={classes.drawerBackground}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
