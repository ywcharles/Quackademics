import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Flashcards from "./routes/Flashcards";
import Pomodoro from "./routes/Pomodoro";
import Profile from "./routes/Profile";
import RubberDuck from "./routes/RubberDuck";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Assignments from "./routes/Assignments";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/flashcards" element={<Flashcards />} />
          <Route exact path="/pomodoro" element={<Pomodoro />} />
          <Route exact path="/assignments" element={<Assignments />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/rubberduck" element={<RubberDuck />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
