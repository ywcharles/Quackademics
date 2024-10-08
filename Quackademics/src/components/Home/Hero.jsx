import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { useUserSessionStore } from "../../stores/UserSessionStore";

const Hero = () => {
  const loginSuccess = useUserSessionStore((state) => state.loginSuccess);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingX: 15,
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h1" sx={{ textAlign: "left" }}>
          Gamify Your Studying
        </Typography>
        <Typography sx={{ textAlign: "left" }}>
          Tired of endless note-taking apps and falling behind in your studies?
          Quackademics is here to revolutionize the way you learn. Our fun and
          effective platform transforms studying into a rewarding game, helping
          you stay focused, track your progress, and achieve your academic
          goals. Join our quacktastic community and dive into a world of smarter
          studying.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {!loginSuccess && (
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "50%" }}
              href="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Box>

      <Avatar
        src={"/babyboy_glasses.png"}
        alt="quackquack"
        sx={{
          width: 350,
          height: 350,
          borderRadius: "50%",
          objectFit: "cover",
          imageRendering: "pixelated",
        }}
      />
    </Box>
  );
};

export default Hero;
