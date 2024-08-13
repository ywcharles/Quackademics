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

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="dashboard/home" element={<Home />} />
          <Route path="dashboard/flashcards" element={<Flashcards />} />
          <Route path="dashboard/pomodoro" element={<Pomodoro />} />
          <Route path="dashboard/profile" element={<Profile />} />
          <Route path="dashboard/rubberduck" element={<RubberDuck />} />
          <Route path="dashboard/voicechannel" element={<VoiceChannel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
