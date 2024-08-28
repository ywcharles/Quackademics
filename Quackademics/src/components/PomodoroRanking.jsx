import * as React from 'react';
import Box from '@mui/material/Box';

const PomodoroRanking = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#615f5f",
          color: "white",
          borderRadius: 2,
          width: "100%",
          height: "100%"
        }}
      >
        Pomodoro Rankings Board
      </Box>
    </>
  )
}

export default PomodoroRanking;