
import { CREATE_GAME, GET_USERNAME, UPDATE_USER } from '../constants';
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
               dispatch({ type: CREATE_GAME, payload: json });
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



export const getUser = (username) => (dispatch) =>{
     return fetch(`https://backend-gamematch.herokuapp.com/users/username/${username}`)
          .then((response) => response.json())
          .then((json) => {
               const {username, rating, _id, img, email, premium, chats, description, socialNetworks, rol} = json
               let user = {username, rating, _id, img, email, premium, chats, description, socialNetworks, rol}
               dispatch({ type: GET_USERNAME, payload: user});
          });
}

export const updateUser = (payload) =>{
     return {type: UPDATE_USER, payload}
}