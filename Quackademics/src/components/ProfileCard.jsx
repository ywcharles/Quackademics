import * as React from 'react';
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';

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
          gap: 2,
          borderRadius: 2,
          height: 275,
          width: "100%"
        }}
      >
        <Avatar 
          src="../public/kiki_lin.jpg"
          alt="Kiki Lin" // alt content should be person's name they input
          sx={{ width: 125, height: 125 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column"
          }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', overflow: "hidden"}}>Kiki Lin</Typography>
          <Typography variant="body1" sx={{ overflow: "hidden"}}>Computer Science, 2020-2025 </Typography>
          <Typography variant="body2" sx={{ color: "lightgrey", overflow: "hidden", mt: 1}}>
            Hi! My name is Kiki! Pretend there is some very interesting facts about me here.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default ProfileCard;