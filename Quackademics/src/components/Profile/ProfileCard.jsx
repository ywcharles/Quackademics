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
import { reloadProfile } from "../../supabase/AccountSupabase";

const formatStudyBio = (study, start, end) => {
  if (start && end) {
    return study + " | " + start.split("-")[0] + " - " + end.split("-")[0];
  }
};

const ProfileCard = () => {
  const userId = useUserSessionStore((state) => state.userId);
  const username = useUserSessionStore((state) => state.username);
  const loadedProfilePicture = useUserSessionStore(
    (state) => state.profilePicture,
  );

  const [openDialog, setOpenDialog] = useState(false);

  const loadedBio = useUserSessionStore((state) => state.bio);
  const loadedStudy = useUserSessionStore((state) => state.study);
  const loadedStartYear = useUserSessionStore((state) => state.startYear);
  const loadedGraduationYear = useUserSessionStore(
    (state) => state.graduationYear,
  );
  const setLoadedBio = useUserSessionStore((state) => state.setBio);
  const setLoadedStudy = useUserSessionStore((state) => state.setStudy);
  const setLoadedStartYear = useUserSessionStore((state) => state.setStartYear);
  const setLoadedGraduationYear = useUserSessionStore(
    (state) => state.setGraduationYear,
  );

  const [bio, setBio] = useState(null);
  const [study, setStudy] = useState(null);
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

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    if (!bio || !study || !startYear || !graduationYear) {
      alert("Please enter new details or exit");
    } else {
      await editProfile(bio, study, startYear, graduationYear, userId);
      const newUserProfile = await reloadProfile(userId);
      setLoadedBio(newUserProfile.bio);
      setLoadedStudy(newUserProfile.study);
      setLoadedStartYear(newUserProfile.start_year);
      setLoadedGraduationYear(newUserProfile.graduation_year);
      setOpenDialog(false);
      alert("Profile updated!");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "#615f5f",
          color: "inherit",
          gap: 1,
          borderRadius: 2,
          width: "100%",
          height: "fit-content",
          justifyContent: "space-between",
        }}
      >
        <Avatar
          src={loadedProfilePicture}
          alt={username + "_pfp"} // alt content should be person's name they input
          sx={{
            mt: 2,
            width: 350,
            height: 350,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            height: "10%",
            width: "100%",
            textAlign: "left",
          }}
        >
          @{username}
        </Typography>
        <Typography
          variant="body1"
          sx={{ height: "10%", width: "100%", textAlign: "left" }}
        >
          {formatStudyBio(loadedStudy, loadedStartYear, loadedGraduationYear)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "lightgrey",
            mt: 2,
            width: "100%",
            textAlign: "left",
          }}
        >
          {loadedBio}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          sx={{ mt: 2, mb: 1, width: "95%" }}
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
      </Box>
    </>
  );
};

export default ProfileCard;
