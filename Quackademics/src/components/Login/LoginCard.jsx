import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

const LoginCard = () => {
  const [createIsOpen, setCreateOpen] = React.useState(false);

  const handleClickOpen = () => {
    setCreateOpen(true);
  };

  const handleClose = () => {
    setCreateOpen(false);
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        backgroundColor: "#363636",
        width: "35vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "white", mt: 2 }}
        >
          Sign in
        </Typography>
        <TextField
          ç
          id="filled-basic"
          label="Email"
          variant="filled"
          placeholder="name@drexel.edu"
          required
          size="small"
          sx={{
            backgroundColor: "#464646",
            width: "60%",
          }}
        />
        <TextField
          id="filled-basic"
          label="Password"
          variant="filled"
          placeholder="password"
          type="password"
          required
          size="small"
          sx={{
            backgroundColor: "#464646",
            width: "60%",
          }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ width: "30%", mt: 1 }}
        >
          Login
        </Button>
      </Box>

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
          New to the community?
        </Divider>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
          sx={{ width: "50%", mt: 4 }}
        >
          Create an account
        </Button>
        <Dialog
          open={createIsOpen}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Create an Account</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="username"
              label="Username"
              type="username"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
              sx={{ width: "50%", mt: 4 }}
            >
              Next
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default LoginCard;
