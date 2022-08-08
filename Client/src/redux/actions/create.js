import { CREATE_GAME } from '../constants';
import playersLoL from '../../data/data/usersLOL.json';
import playersCSGO from '../../data/data/usersCSGO.json';
import playersR6 from '../../data//data/usersR6.json';

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

export const getPlayersLoL = () => {
     return async (dispatch) => {
          let json = playersLoL;
          return dispatch({
               type: 'GET_PLAYERS_LOL',
               payload: json,
          });
     };
};

export const getPlayersCSGO = () => {
     return async (dispatch) => {
          let json = playersCSGO;
          return dispatch({
               type: 'GET_PLAYERS_CSGO',
               payload: json,
          });
     };
};

export const getPlayersR6 = () => {
     return async (dispatch) => {
          let json = playersR6;
          return dispatch({
               type: 'GET_PLAYERS_R6',
               payload: json,
          });
     };
};
