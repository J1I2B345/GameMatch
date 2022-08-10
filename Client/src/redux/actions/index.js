import { CREATE_GAME, GET_USERNAME } from '../constants';
import playersLoL from '../../data/data/usersLOL.json';
import playersCSGO from '../../data/data/usersCSGO.json';
import playersR6 from '../../data/data/usersR6.json';

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

// export const getPlayersLoL = () => {
//      return async (dispatch) => {
//           let json = playersLoL;
//           return dispatch({
//                type: 'GET_PLAYERS_LOL',
//                payload: json,
//           });
//      };
// };

// export const getPlayersCSGO = () => {
//      return async (dispatch) => {
//           let json = playersCSGO;
//           return dispatch({
//                type: 'GET_PLAYERS_CSGO',
//                payload: json,
//           });
//      };
// };

// export const getPlayersR6 = () => {
//      return async (dispatch) => {
//           let json = playersR6;
//           return dispatch({
//                type: 'GET_PLAYERS_R6',
//                payload: json,
//           });
//      };
// };

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



export const getUser = (username) => (dispatch) =>{
     return fetch(`http://localhost:3001/users/username/${username}`)
          .then((response) => response.json())
          .then((json) => {
               dispatch({ type: GET_USERNAME, payload: json });
          });
}
