import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Flashcards from "./routes/Flashcards";
import Pomodoro from "./routes/Pomodoro";
import Profile from "./routes/Profile";
import RubberDuck from "./routes/RubberDuck";
import VoiceChannel from "./routes/VoiceChannel";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SpotifyOverlay from "./components/Spotify/SpotifyOverlay";

function App() {
  return (
    <>
      <Navbar />
      <SpotifyOverlay />
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/flashcards" element={<Flashcards />} />
          <Route exact path="/pomodoro" element={<Pomodoro />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/rubberduck" element={<RubberDuck />} />
          <Route exact path="/voicechannel" element={<VoiceChannel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
