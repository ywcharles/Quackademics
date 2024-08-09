import * as React from 'react';
import Box from '@mui/material/Box';

const StatsGraph = () => {
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
          height: 250,
          width: 250
        }}
      >
        Stats Graph 
      </Box>
    </>
  )
}

export default StatsGraph;