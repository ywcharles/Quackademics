import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<div />} />
          <Route path="" element={<div />} />
          <Route path="" element={<div />} />
          <Route path="" element={<div />} />
          <Route path="" element={<div />} />
          <Route path="" element={<div />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
