import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateGame from "./Components/CreateGame/CreateGame";
import Login from "./Components/Login/Login";
import GameHome from "./Components/GameHome/GameHome";
import CreateNews from "./Components/CreateNews/CreateNews";
import News from "./Components/News/News";
import Register from "./Components/Register/Register";
import ProfileHome from "./Components/ProfileHome/ProfileHome";
import EditProfile from "./Components/EditProfile/EditProfile";
import EditGame from "./Components/EditGame/EditGame";
import EditNews from "./Components/EditNews/EditNews";
import PanelHome from "./Components/PanelHome/PanelHome";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/creategame" element={<CreateGame />} />
        <Route path="/createnews" element={<CreateNews />} />
        <Route path="/" element={<Login />} />
        <Route path="/gamehome" element={<GameHome />} />
        <Route path="/news" element={<News />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profilehome" element={<ProfileHome />} />
        <Route path="Users/username/:username" element={<EditProfile />} />
        <Route path="/gamehome/Games/:id" element={<EditGame />} />
        <Route path="/News/:id" element={<EditNews />} />
        <Route path="/panel" element={<PanelHome />} />
      </Routes>
    </div>
  );
}

export default App;
