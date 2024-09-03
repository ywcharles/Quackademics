import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import SignUp from "./SignUp";
import { useUserSessionStore } from "../../stores/UserSessionStore";
import { signInUser } from "../../supabase/AccountSupabase";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const userId = useUserSessionStore((state) => state.userId);
  const setUserId = useUserSessionStore((state) => state.setUserId);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleLoginClick = async () => {
    await signInUser(username, password).then((result) => {
      if (result !== null) {
        setUserId(result);
        navigate("/home");
      } else {
        alert("Login unsuccessful");
      }
    });
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
        gap: 2,
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
          label="Username"
          variant="filled"
          placeholder="name@drexel.edu"
          required
          size="small"
          sx={{
            backgroundColor: "#464646",
            width: "60%",
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ width: "30%", mt: 1 }}
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </Box>
      <SignUp />
    </Box>
  );
};

export default LoginCard;
