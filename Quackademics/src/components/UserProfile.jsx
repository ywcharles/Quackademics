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
        height: "100%",
        width: "100%"
      }}>

        {/* Left column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            mr: 10,
            width: 250
          }}>
          <ProfileCard />
          <StatsGraph />
        </Box>

        {/* Right Column */}
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
                <Button variant="contained" color="primary" sx={{ width: "100%"}}>Friends</Button>
                <Button variant="contained" color="primary" sx={{ width: "100%" }}>Config</Button>
                <Button variant="contained" color="primary" sx={{ width: "100%" }}>Scoreboard</Button>
            </Box>

            {/* heat map */}
            <Heatmap />

            {/* Ranking box */}
            <Box 
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2
              }}>
                <PomodoroRanking /> 
                <OverrallStudyRanking/> 
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: 135
                  }}>
                    <Button variant="contained" color="primary" sx={{height: "100%"}}>button</Button>
                    <Button variant="contained" color="primary" sx={{height: "100%"}}>button</Button>
                    <Button variant="contained" color="primary" sx={{height: "100%"}}>button</Button>
                    <Button variant="contained" color="primary" sx={{height: "100%"}}>button</Button>
                    <Button variant="contained" color="primary" sx={{height: "100%"}}>button</Button>
                  </Box>
              </Box>
        </Box>
    </Box>
    
  );
}

export default UserProfile;
