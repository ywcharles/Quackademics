import * as React from 'react';
import Box from '@mui/material/Box';

const ProfileCard = () => {
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
          height: 275,
          width: "100%"
        }}
      >
        Profile card
      </Box>
    </>
  )
}

export default ProfileCard;