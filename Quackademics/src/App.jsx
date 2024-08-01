import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pomodoro from "./routes/Pomodoro";
import Profile from "./routes/Profile";
import RubberDuck from "./routes/RubberDuck";
import VoiceChannel from "./routes/VoiceChannel";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div>website</div>
      <Navbar />
      <BrowserRouter>
        <Routes>
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
