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

  const deleteButton = async (game) => {
    try {
      console.log({ game });
      await axios
        .delete(`https://backend-gamematch.herokuapp.com/games/${game}`)
        .then(() => {
          let newData = gamesDB.filter((el) => el.game !== game);

          setGames(newData);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {gamesDB.map((data) => (
        <div key={data.name}>
          <div>
            <Link to={`games/${data._id}`}>
              <img
                className="img-game"
                src={data.image}
                alt=""
                key={data._id}
              />
            </Link>
          </div>

          <button
            className="delete-btn"
            onClick={(e) => deleteButton(data._id)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default GameCard;
