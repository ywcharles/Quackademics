import React from "react";
import ProfileCard from "./ProfileCard";
import { Box, Button } from "@mui/material";
import Heatmap from "./Heatmap";
import CourseSchedule from "./CourseSchedule";

const UserProfile = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignContent: "top",
        height: "70vh",
        width: "100%",
        gap: 4,
      }}
    >
      {/* Left column */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          mr: 5,
          width: "25vw",
        }}
      >
        <ProfileCard />
      </Box>

      {/* Right Column */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* heat map */}
        <Heatmap />
        <Box sx={{ width: "100%", height: "100%" }}>
          <CourseSchedule />
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
