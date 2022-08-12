import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateGame from "./Components/CreateGame/CreateGame";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/create" element={<CreateGame />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
