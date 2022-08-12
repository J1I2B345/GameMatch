import axios from "axios";
export const CREATE_GAME = "CREATE_GAME";
export const GET_USERNAME = "GET_USERNAME";
export const UPDATE_USER = "UPDATE_USER";

export const createGame = (game) => (dispatch) => {
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

export const updateUser = (payload) => {
  return { type: UPDATE_USER, payload };
};
export const getUser = (username) => (dispatch) => {
  console.log({ username });
  return fetch(
    `https://backend-gamematch.herokuapp.com/users/username/${username}`
  )
    .then((response) => response.json())
    .then((json) => {
      const {
        username,
        rating,
        _id,
        img,
        email,
        premium,
        chats,
        description,
        socialNetworks,
        rol,
      } = json;
      let user = {
        username,
        rating,
        _id,
        img,
        email,
        premium,
        chats,
        description,
        socialNetworks,
        rol,
      };
      dispatch({ type: GET_USERNAME, payload: user });
    });
};
export const getAllNews = () => {
  return async (dispatch) => {
    try {
      let json = await axios.get(
        `https://backend-gamematch.herokuapp.com/News`
      );
      return dispatch({
        type: "GET_ALL_NEWS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
