import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import SignUp from "./SignUp";
import { useUserSessionStore } from "../../stores/UserSessionStore";
import { getUsername, signInUser } from "../../supabase/AccountSupabase";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const setUserId = useUserSessionStore((state) => state.setUserId);

  const setProfilePicture = useUserSessionStore(
    (state) => state.setProfilePicture,
  );
  const setGlobalUsername = useUserSessionStore((state) => state.setUsername);
  const setLoginSuccess = useUserSessionStore((state) => state.setLoginSuccess);
  const setShowWelcome = useUserSessionStore((state) => state.setShowWelcome);
  const setBio = useUserSessionStore((state) => state.setBio);
  const setStudy = useUserSessionStore((state) => state.setStudy);
  const setStartYear = useUserSessionStore((state) => state.setStartYear);
  const setGraduationYear = useUserSessionStore(
    (state) => state.setGraduationYear,
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginClick = async () => {
    await signInUser(username, password).then(async (result) => {
      if (result !== null) {
        console.log("result", result);
        setLoginSuccess(true);
        setShowWelcome(true);
        setUserId(result.uid);
        setGlobalUsername(result.username);
        setProfilePicture(result.profile_picture);
        setBio(result.bio);
        setStudy(result.study);
        setStartYear(result.start_year);
        setGraduationYear(result.graduation_year);
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
