import { ExitToApp } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";

const Profile = () => {
  const { user, isAuthenticated } = useSelector(userSelector);

  const favMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Box>
      <Box display={"flex"} justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        {isAuthenticated && (
          <Button color="inherit" onClick={logout}>
            Logout &nbsp; <ExitToApp />
          </Button>
        )}
      </Box>
      {!favMovies.length ? (
        <Typography variant="h5">Add favourites!</Typography>
      ) : (
        <Box>Fav Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
