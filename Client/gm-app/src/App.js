import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateGame from "./Components/CreateGame/CreateGame";
import Login from "./Components/Login/Login";
import GameHome from "./Components/GameHome/GameHome";
import CreateNews from "./Components/CreateNews/CreateNews";
import News from "./Components/News/News";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/creategame" element={<CreateGame />} />
        <Route path="/createnews" element={<CreateNews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gamehome" element={<GameHome />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
  );
}

export default App;
