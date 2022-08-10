import { CREATE_GAME } from '../constants';
import allUsers from '../../data/UsersInfo.js';

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
               dispatch({ type: CREATE_GAME });
          });
};

export const getUsers = () => {
     return async (dispatch) => {
          let json = allUsers;
          return dispatch({
               type: 'GET_USERS',
               payload: json,
          });
     };
};

export const getUserByName = (name) => {
     return async (dispatch) => {
          try {
               // let json = await axios.get(`/user?name=${name}`);
               return dispatch({
                    type: 'GET_USER_BY_NAME',
                    // payload: json.data,
                    payload: name,
               });
          } catch (error) {
               console.log(error);
          }
     };
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
