import { Box, Typography } from "@mui/material";
import { navComponents } from "../../util/Navbar.util";

import React from "react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        gap: 5,
        paddingX: 15,
      }}
    >
      <Typography variant="h2">Features</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          overflow: "hidden",
          overflowX: "auto",
          position: "relative",
        }}
      >
        <FeatureCard image="/Flashcards.png" title="Flashcards" route="/dashboard/flashcards">
          Master your studies with our Flashcard feature. Create custom cards,
          test your knowledge, and track progress. Learn efficiently and
          effectively.
        </FeatureCard>
        <FeatureCard image="/Pomodoro.png" title="Pomodoro" route="/dashboard/pomodoro">
          Boost focus and productivity with our Pomodoro Timer. Work in timed
          intervals, take short breaks, and maximize your study sessions.
          Achieve more in less time.
        </FeatureCard>
        <FeatureCard image="/Duckie.png" title="Rubber Duck" route="/dashboard/rubberduck">
          Unstuck yourself with our Rubber Duck Method. Talk through problems
          out loud to gain clarity and find solutions. Overcome challenges with
          ease and confidence.
        </FeatureCard>
        <FeatureCard image="/VC.png" title="Video Channels" route="/dashboard/voicechannel">
          Study together, anytime, anywhere. Join live video study sessions with
          friends. Enjoy focused study time with background music for added
          concentration.
        </FeatureCard>
        <FeatureCard
          image="/Profile.png"
          title="Check Your Stats"
          route="/dashboard/Profile"
        >
          The profile feature offers personalized study statistics, enabling
          users to monitor their productivity. It provides insights into
          learning patterns, helping users track progress and achieve their
          educational goals efficiently.
        </FeatureCard>
      </Box>
    </Box>
  );
};

export default Features;
