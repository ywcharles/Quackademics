import "./App.css";
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
  const loginSuccess = useUserSessionStore((state) => state.loginSuccess);
  const profilePicture = useUserSessionStore((state) => state.profilePicture);

  const setLoginSuccess = useUserSessionStore((state) => state.setLoginSuccess);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoginSuccess(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={loginSuccess}
        onClose={handleClose}
        autoHideDuration={2000}
        // TransitionComponent={<Slide direction="up" />}
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
