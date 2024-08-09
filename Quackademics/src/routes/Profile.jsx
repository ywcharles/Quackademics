import React from "react";
import ProfileCard from "../components/ProfileCard";
import { Box, Grid } from "@mui/material";

function Profile() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignContent: "top",
      }}>

        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            pr: 10
          }}>
          <ProfileCard />
          <ProfileCard /> 
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4
          }}>
            {/* tabs box */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1
              }}>
                <ProfileCard />// Friends
                <ProfileCard />// Config
                <ProfileCard />// Scoreboard
            </Box>

            {/* heat map box */}
            <Box
              sx={{
                display: "flex",
                pt: 2,
              }}>
                <ProfileCard /> // Heat map 
              </Box>

              {/* Ranking box */}
              <Box 
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2
                }}>
                  <ProfileCard /> // Pomodoro Ranking
                  <ProfileCard /> // Overrall ranking
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1
                    }}>
                      <ProfileCard /> 
                      <ProfileCard /> 
                      <ProfileCard /> 
                      <ProfileCard /> 
                      <ProfileCard /> 
                    </Box>
                </Box>
        </Box>
    </Box>
    
  );
}

export default Profile;
