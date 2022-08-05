import { CREATE_GAME } from "../constants";

export const createGame = (game) => {
  return fetch("https://backend-gamematch.herokuapp.com/games", {
    method: "POST",
    headers: { Accept: "applcation/json", "Content-Type": "application/json" },
    body: JSON.stringify(game),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      ({ type: CREATE_GAME, payload: game });
    });
};
