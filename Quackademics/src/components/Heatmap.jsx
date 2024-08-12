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
          borderRadius: 2,
          width: "100%",
          height: "60%"
        }}
      >
        Heatmap
      </Box>
    </>
  )
}

export default Heatmap;