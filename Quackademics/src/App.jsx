import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Flashcards from "./routes/Flashcards";
import Pomodoro from "./routes/Pomodoro";
import Profile from "./routes/Profile";
import RubberDuck from "./routes/RubberDuck";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Assignments from "./routes/Assignments";
import Notes from "./routes/Notes";
import { Snackbar } from "@mui/material";
import { useUserSessionStore } from "./stores/UserSessionStore";

function App() {
  const username = useUserSessionStore((state) => state.username);
  const showWelcome = useUserSessionStore((state) => state.showWelcome);
  const profilePicture = useUserSessionStore((state) => state.profilePicture);

  const setShowWelcome = useUserSessionStore((state) => state.setShowWelcome);

  const handleWelcomeClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowWelcome(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={showWelcome}
        onClose={handleWelcomeClose}
        autoHideDuration={1000}
        message={
          <h3>
            <img
              src={profilePicture}
              style={{ width: "50px", height: "50px" }}
            />
            Welcome, {username}!
          </h3>
        }
      />
      <Navbar />
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" replace />} />
          <Route exact path="/home" element={<Home />} />

          <Route exact path="/flashcards" element={<Flashcards />} />
          <Route exact path="/pomodoro" element={<Pomodoro />} />
          <Route exact path="/assignments" element={<Assignments />} />
          <Route exact path="/rubberduck" element={<RubberDuck />} />
          <Route exact path="/notes" element={<Notes />} />

          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
