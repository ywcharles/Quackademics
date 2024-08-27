import { Box, TextField, Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
// import supabase from "../libs/supabaseAdmin";
import { createClient } from "@supabase/supabase-js";
import supabase from "../libs/supabaseAdmin";

const SignUp = () => {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const salt = "";

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

    // email verify
    if (!email.endsWith("@drexel.edu")) {
      setEmailError("Please use a valid drexel.edu email address.");
      return;
    }

    try {
      alert("Check your email for the verification link.");
      const { data, error } = await supabase
        .from("users")
        .insert([{ username: username, email: email, password_hash: password }])
        .select();

      handleSignUpClose();
    } catch (error) {
      setEmailError("An error occurred during sign-up. Please try again.");
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
        new to the community
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
        // onClose={handleSignUpClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSignUpSubmit,
        }}
      >
        <DialogTitle>Create an Account</DialogTitle>
        <DialogContent>
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
            autoFocus
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
            autoFocus
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
            sign up
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SignUp;

