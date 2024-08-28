import React from "react";
import ProfileCard from "../components/ProfileCard";
import { Box, Button, ButtonGroup} from "@mui/material";
import StatsGraph from "../components/StatsGraph";
import Heatmap from "../components/Heatmap";
import PomodoroRanking from "../components/PomodoroRanking";
import OverrallStudyRanking from "../components/OverallStudyRanking";
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
        gap: 4
      }}>
        {/* Left column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            mr:5,
            width: "25vw",
          }}>
          <ProfileCard />
          <StatsGraph />
        </Box>

        {/* Right Column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
          }}>
            {/* tabs box */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1
              }}>
                <Button variant="contained" color="primary" sx={{ width: "100%"}}>Friends</Button>
                <Button variant="contained" color="primary" sx={{ width: "100%" }}>Config</Button>
                <Button variant="contained" color="primary" sx={{ width: "100%" }}>Scoreboard</Button>
            </Box>

            {/* heat map */}
            <Heatmap />

            {/* Ranking boxes */}
            <Box 
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                height: "45%"
              }}>
                <PomodoroRanking /> 
                <OverrallStudyRanking/> 
              </Box>
        </Box>
        <Box sx={{ width: "50%", height: "100%" }}> <CourseSchedule /></Box>
    </Box>
    
  );
}

export default UserProfile;
