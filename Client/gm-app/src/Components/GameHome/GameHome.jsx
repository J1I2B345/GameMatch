import React from "react";
import GameCard from "../GamesCard/GameCard";
import { Link } from "react-router-dom";

const GameHome = () => {
  return (
    <div className="1">
      <div className="2">Select your game</div>
      <GameCard />
      <Link to="/creategame">Crear Juego</Link>
    </div>
  );
};

export default GameHome;
