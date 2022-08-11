import { GET_ALL_NEWS } from "../constants";

export const getAllNews = () => (dispatch) => {
  return fetch("https://backend-gamematch.herokuapp.com/News")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      dispatch({ type: GET_ALL_NEWS, payload: json });
    });
};
