import React from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import { Box } from "@mui/material";

function Pomodoro() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <img
        style={{ imageRendering: "pixelated" }}
        width={500}
        height={500}
        src="/babyboy_pomodoro.png"
      />
      <PomodoroTimer />
    </Box>
  );
}

export default Pomodoro;
