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
          width: "100%",
          height: "65%",
          justifyContent: "space-between"
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
        <Typography variant="h6" sx={{ fontWeight: 'bold', height: "10%", width: "100%"}}>Kiki Lin</Typography>
        <Typography variant="body1" sx={{ height: "10%", width: "100%"}}>Computer Science, 2020-2025 </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "auto"
          }}>
          <Typography variant="body2" sx={{ color: "lightgrey", overflow: "hidden", mt: 2}}>
            Hi! My name is Kiki! Pretend there is some very interesting facts about me here.
          </Typography>
        </Box>
        <Button variant="contained" color="secondary" size='small' sx={{ mb: 1, width: "95%"}}>Edit Profile</Button>
      </Box>
    </>
  )
}

export default ProfileCard;