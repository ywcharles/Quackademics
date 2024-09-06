import { Box, TextField, Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { addUser, hashPassword } from "../../supabase/AccountSupabase";
import ProfilePictureSetUp from "../Profile/ProfilePictureCard";

const SignUp = () => {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const handleSignUpClickOpen = () => {
    setOpen(true);
  };

  const handleSignUpClose = () => {
    setOpen(false);
    setEmailError("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    if (!email.endsWith("@drexel.edu")) {
      setEmailError("Please use a valid drexel.edu email address.");
      return;
    }

    const hashedPassword = await hashPassword(password);

    try {
      const userReq = await addUser(
        username,
        email,
        hashedPassword,
        profilePicture,
      );

      if (userReq) {
        console.log("create error", userReq);
        if (userReq.code === "23505")
          setEmailError("Email already exists on system.");
      } else {
        handleSignUpClose();
      }
    } catch (error) {
      setEmailError("An error occurred during sign-up. Please try again.");
      console.log("error", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Divider variant="middle" flexItem sx={{ fontWeight: "light" }}>
        New to the community? Sign up!
      </Divider>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        onClick={handleSignUpClickOpen}
        sx={{ width: "50%", mt: 4 }}
      >
        Create an account
      </Button>
      <Dialog
        open={open}
        onClose={handleSignUpClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSignUpSubmit,
        }}
      >
        <DialogTitle>Create an Account</DialogTitle>
        <DialogContent>
          <ProfilePictureSetUp setProfilePicture={setProfilePicture} />
          <TextField
            autoFocus
            required
            margin="dense"
            name="username"
            label="Username"
            type=""
            fullWidth
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            required
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ width: "100%", mt: 4 }}
          >
            Sign Up
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SignUp;
