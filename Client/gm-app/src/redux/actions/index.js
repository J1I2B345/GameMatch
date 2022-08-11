export const CREATE_GAME = "CREATE_GAME";
export const GET_USERNAME = "GET_USERNAME";
export const UPDATE_USER = "UPDATE_USER";

export const createGame = (game) => (dispatch) => {
  console.log(game);
  return fetch("https://backend-gamematch.herokuapp.com/games", {
    method: "POST",
    headers: { Accept: "applcation/json", "Content-Type": "application/json" },
    body: JSON.stringify(game),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      dispatch({ type: CREATE_GAME, payload: json });
    });
};

export const getUser = (username) => (dispatch) => {
  return fetch(
    `https://backend-gamematch.herokuapp.com/users/username/${username}`
  )
    .then((response) => response.json())
    .then((json) => {
      const { username, rating, _id, img } = json;
      let user = { username, rating, _id, img };
      dispatch({ type: GET_USERNAME, payload: user });
    });
};

export const updateUser = (payload) => {
  return { type: UPDATE_USER, payload };
};
