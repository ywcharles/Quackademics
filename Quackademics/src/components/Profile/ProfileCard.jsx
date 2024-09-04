import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useUserSessionStore } from "../../stores/UserSessionStore";
import ProfilePictureSetUp from "../Profile/ProfilePictureCard";

const ProfileCard = () => {
  const username = useUserSessionStore((state) => state.username);
  const loadedProfilePicture = useUserSessionStore(
    (state) => state.profilePicture,
  );
  const [profilePicture, setProfilePicture] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [bio, setBio] = useState("");
  const [study, setStudy] = useState("");
  const [startYear, setStartYear] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const handleEditProfileOpen = () => {
    setOpenDialog(true);
  };

  const handleEditProfileClose = () => {
    setOpenDialog(false);
    setBio("");
    setStudy("");
    setStartYear("");
    setGraduationYear("");
  };

  const handleEditProfileSubmit = () => {
    console.log(bio, study, startYear, graduationYear);
  };

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
          justifyContent: "space-between",
        }}
      >
        <Avatar
          src={loadedProfilePicture}
          alt={username + "_pfp"} // alt content should be person's name they input
          sx={{
            mt: 2,
            width: 130,
            height: 130,
          }}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", height: "10%", width: "100%" }}
        >
          @{username}
        </Typography>
        <Typography variant="body1" sx={{ height: "10%", width: "100%" }}>
          Computer Science, 2020-2025{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "lightgrey", overflow: "hidden", mt: 2 }}
          >
            Hi! My name is Kiki! Pretend there is some very interesting facts
            about me here.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          sx={{ mb: 1, width: "95%" }}
          onClick={handleEditProfileOpen}
        >
          Edit Profile
        </Button>
        <Dialog
          open={openDialog}
          onClose={handleEditProfileClose}
          PaperProps={{
            component: "form",
            onSubmit: handleEditProfileSubmit,
          }}
        >
          <DialogTitle>Create an Account</DialogTitle>
          <DialogContent>
            <ProfilePictureSetUp setProfilePicture={setProfilePicture} />
            <TextField
              autoFocus
              required
              margin="dense"
              name="bio"
              label="Bio"
              fullWidth
              variant="standard"
              onChange={(e) => setBio(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              name="email"
              label="Email Address"
              fullWidth
              variant="standard"
              onChange={(e) => setStudy(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              name="gradYear"
              label="GradYear"
              fullWidth
              variant="standard"
              onChange={(e) => setGraduationYear(e.target.value)}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default ProfileCard;
