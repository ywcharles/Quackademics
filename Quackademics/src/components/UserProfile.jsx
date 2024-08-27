import React from "react";
import ProfileCard from "../components/ProfileCard";
import { Box, Button, ButtonGroup} from "@mui/material";
import StatsGraph from "../components/StatsGraph";
import Heatmap from "../components/Heatmap";
import PomodoroRanking from "../components/PomodoroRanking";
import OverrallStudyRanking from "../components/OverallStudyRanking";

const UserProfile = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignContent: "top",
        height: "70vh",
        width: "100%",
      }}>

        {/* Left column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            mr: 10,
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "50%",
                  }}>
                    <Button variant="contained" color="primary" sx={{ height: "100%" }}>button</Button>
                    <Button variant="contained" color="primary" sx={{ height: "100%" }}>button</Button>
                    <Button variant="contained" color="primary" sx={{ height: "100%" }}>button</Button>
                    <Button variant="contained" color="primary" sx={{ height: "100%" }}>button</Button>
                    <Button variant="contained" color="primary" sx={{ height: "100%" }}>button</Button>
                  </Box>
              </Box>
        </Box>
    </Box>
    
  );
}

export default UserProfile;
