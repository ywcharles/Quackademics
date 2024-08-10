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
          p: 2,
          gap: 1,
          borderRadius: 2,
          height: "100%",
          width: "100%",
          overflow: "hidden"
        }}
      >
        <Avatar 
          src="/kiki_lin.jpg"
          alt="Kiki Lin" // alt content should be person's name they input
          sx={{ width: 125, height: 125 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', overflow: "hidden"}}>Kiki Lin</Typography>
          <Typography variant="body1" sx={{ overflow: "hidden"}}>Computer Science, 2020-2025 </Typography>
          <Typography variant="body2" sx={{ color: "lightgrey", overflow: "hidden", mt: 1}}>
            Hi! My name is Kiki! Pretend there is some very interesting facts about me here.
          </Typography>
        </Box>
        <Button variant="contained" color="secondary" size='small'>Edit Profile</Button>
      </Box>
    </>
  )
}

export default ProfileCard;