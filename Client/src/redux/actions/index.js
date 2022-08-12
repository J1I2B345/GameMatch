import { CREATE_GAME, GET_USERNAME, UPDATE_USER, CREATE_SOCKET } from '../constants';
import axios from 'axios';

export const createGame = (game) => (dispatch) => {
     return fetch('https://backend-gamematch.herokuapp.com/games', {
          method: 'POST',
          headers: { Accept: 'applcation/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(game),
     })
          .then((response) => {
               return response.json();
          })
          .then((json) => {
               dispatch({ type: CREATE_GAME, payload: json });
          });
};

export const orderByRating = (payload) => {
     return {
          type: 'ORDER_BY_RATING',
          payload,
     };
};

export const filterByPosition = (payload) => {
     return {
          type: 'FILTER_BY_POSITION',
          payload,
     };
};

export const filterByEloLoL = (payload) => {
     return {
          type: 'FILTER_BY_ELO_LOL',
          payload,
     };
};

export const filterByEloCSGO = (payload) => {
     return {
          type: 'FILTER_BY_ELO_CSGO',
          payload,
     };
};

export const filterByEloR6 = (payload) => {
     return {
          type: 'FILTER_BY_ELO_R6',
          payload,
     };
};

export const getUser = (username) => (dispatch) => {
     return fetch(`https://backend-gamematch.herokuapp.com/users/username/${username}`)
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

export const updateUser = (payload) => {
     return { type: UPDATE_USER, payload };
};

export const getAllNews = () => {
     return async (dispatch) => {
          try {
               let json = await axios.get(`https://backend-gamematch.herokuapp.com/News`);
               return dispatch({
                    type: 'GET_ALL_NEWS',
                    payload: json.data,
               });
          } catch (error) {
               console.log(error);
          }
     };
};
