import * as React from 'react';
import Box from '@mui/material/Box';
import { Avatar, Button, Typography } from '@mui/material';

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
          gap: 1,
          borderRadius: 2,
          overflow: "auto",
          width: "100%",
          height: "65%"
        }}
      >
        <Avatar 
          src="/kiki_lin.jpg"
          alt="Kiki Lin" // alt content should be person's name they input
          sx={{ 
            mt: 2,
            width: 130,
            height: 130,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', overflow: "hidden"}}>Kiki Lin</Typography>
          <Typography variant="body1" sx={{ overflow: "hidden"}}>Computer Science, 2020-2025 </Typography>
          <Typography variant="body2" sx={{ color: "lightgrey", overflow: "hidden", mt: 2}}>
            Hi! My name is Kiki! Pretend there is some very interesting facts about me here.
          </Typography>
        </Box>
        <Button variant="contained" color="secondary" size='small' sx={{ width: "100%"}}>Edit Profile</Button>
      </Box>
    </>
  )
}

export default ProfileCard;