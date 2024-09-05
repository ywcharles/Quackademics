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
import { editProfile } from "../../supabase/ProfileSupabase";

const ProfileCard = () => {
  const username = useUserSessionStore((state) => state.username);
  const loadedProfilePicture = useUserSessionStore(
    (state) => state.profilePicture,
  );

  const [openDialog, setOpenDialog] = useState(false);

  const [bio, setBio] = useState("");
  const [study, setStudy] = useState("");
  const [startYear, setStartYear] = useState(null);
  const [graduationYear, setGraduationYear] = useState(null);

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

  const handleEditProfileSubmit = async () => {
    await editProfile(bio, study, startYear, graduationYear);
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
          Computer Science, 2020-2025
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
            {bio}
          </Typography>
        </Box>
        <div>
          <Dialog
            open={openDialog}
            onClose={handleEditProfileClose}
            PaperProps={{
              component: "form",
              onSubmit: handleEditProfileSubmit,
            }}
          >
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
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
                name="study"
                label="Study"
                fullWidth
                variant="standard"
                onChange={(e) => setStudy(e.target.value)}
              />
              <TextField
                required
                name="starting year"
                label="Starting Year"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setStartYear(e.target.value)}
              />
              <TextField
                required
                margin="dense"
                name="graduation year"
                label="Graduation Year"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setGraduationYear(e.target.value)}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={handleEditProfileSubmit}
                sx={{ width: "50%", mt: 4 }}
              >
                Save
              </Button>
            </DialogContent>
          </Dialog>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{ mb: 1, width: "95%" }}
            onClick={handleEditProfileOpen}
          >
            Edit Profile
          </Button>
        </div>
      </Box>
    </>
  );
};

export default ProfileCard;
