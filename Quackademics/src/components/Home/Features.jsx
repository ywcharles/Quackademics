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
        <FeatureCard
          image="/Flashcards-sc.png"
          title="Flashcards"
          route="/flashcards"
        >
          Master your studies with our Flashcard feature. Create custom cards,
          test your knowledge, and track progress. Learn efficiently and
          effectively.
        </FeatureCard>
        <FeatureCard
          image="/Pomodoro-sc.png"
          title="Pomodoro"
          route="/pomodoro"
        >
          Boost focus and productivity with our Pomodoro Timer. Work in timed
          intervals, take short breaks, and maximize your study sessions.
          Achieve more in less time.
        </FeatureCard>
        <FeatureCard
          image="/RubberDuck-sc.png"
          title="Rubber Duck"
          route="/rubberduck"
        >
          Unstuck yourself with our Rubber Duck Method. Talk through problems
          out loud to gain clarity and find solutions. Overcome challenges with
          ease and confidence.
        </FeatureCard>
        <FeatureCard image="/Notes-sc.png" title="Notes" route="/notes">
          Take notes using our rich text editor based in Markdown. Visualize
          your notes with our side by side window pane. Add tags and or your
          courses to your notes and pull them up when you need.
        </FeatureCard>
        <FeatureCard
          image="/Stats.png"
          title="Check Your Stats"
          route="/dashboard/Profile"
        >
          The profile feature offers personalized study statistics, enabling
          users to monitor their productivity. It provides insights into
          learning patterns, helping users track progress efficiently.
        </FeatureCard>

        {/* To-do: Add Assignment tracker */}
      </Box>
    </Box>
  );
};

export default Features;
