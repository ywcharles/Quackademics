import * as React from 'react';
import Box from '@mui/material/Box';

const Heatmap = () => {
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
          width: 800
        }}
      >
        Heatmap
      </Box>
    </>
  )
}

export default Heatmap;