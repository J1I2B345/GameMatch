import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateGame from "./Components/CreateGame";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/create" element={<CreateGame />} />
      </Routes>
    </div>
  );
}

export default App;
