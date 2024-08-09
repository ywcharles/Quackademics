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
          p: 2,
          borderRadius: 2,
          height: 200,
          width: 300
        }}
      >
        Pomodoro Rankings Board
      </Box>
    </>
  )
}

export default PomodoroRanking;