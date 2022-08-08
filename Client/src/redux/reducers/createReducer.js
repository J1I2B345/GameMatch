import { CREATE_GAME } from '../constants';

const initialState = {
     games: null,
     playersLoL: [],
     playersCSGO: [],
     playersR6: [],
};

const createReducer = (state = initialState, action) => {
     const { type, payload } = action;

     switch (type) {
          case CREATE_GAME:
               return state;

          case 'GET_PLAYERS_LOL':
               return {
                    ...state,
                    playersLoL: payload,
               };
          case 'GET_PLAYERS_CSGO':
               return {
                    ...state,
                    playersCSGO: payload,
               };
          case 'GET_PLAYERS_R6':
               return {
                    ...state,
                    playersR6: payload,
               };

          default:
               return state;
     }
};

export default createReducer;
