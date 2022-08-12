import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GameCard = () => {
  let [gamesDB, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const response = await axios.get(
        "https://backend-gamematch.herokuapp.com/games"
      );
      const respuesta = response.data;
      setGames(respuesta);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  console.log({ fetchGames });
  console.log({ gamesDB });

  return (
    <div>
      {gamesDB.map((data) => (
        <img className="img-game" src={data.image} alt="" key={data.id} />
      ))}
    </div>
  );
};

export default GameCard;
