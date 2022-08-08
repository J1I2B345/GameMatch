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

          case 'ORDER_BY_RATING': {
               let playersInLoL = [];
               let playersInCSGO = [];
               let playersInR6 = [];
               if (payload === 'Min-Max') {
                    playersInLoL = [...state.playersLoL].sort(function (a, b) {
                         if (a.rating > b.rating) {
                              return 1;
                         }
                         if (a.rating < b.rating) {
                              return -1;
                         }
                         return 0;
                    });
                    playersInCSGO = [...state.playersCSGO].sort(function (a, b) {
                         if (a.rating > b.rating) {
                              return 1;
                         }
                         if (a.rating < b.rating) {
                              return -1;
                         }
                         return 0;
                    });
                    playersInR6 = [...state.playersR6].sort(function (a, b) {
                         if (a.rating > b.rating) {
                              return 1;
                         }
                         if (a.rating < b.rating) {
                              return -1;
                         }
                         return 0;
                    });

                    return {
                         ...state,
                         playersLoL: playersInLoL,
                         playersCSGO: playersInCSGO,
                         playersInR6: playersInR6,
                    };
               }
               if (payload === 'Max-Min') {
                    playersInLoL = [...state.playersLoL].sort(function (a, b) {
                         if (a.rating < b.rating) {
                              return 1;
                         }
                         if (a.rating > b.rating) {
                              return -1;
                         }
                         return 0;
                    });
                    playersInCSGO = [...state.playersCSGO].sort(function (a, b) {
                         if (a.rating < b.rating) {
                              return 1;
                         }
                         if (a.rating > b.rating) {
                              return -1;
                         }
                         return 0;
                    });
                    playersInR6 = [...state.playersR6].sort(function (a, b) {
                         if (a.rating < b.rating) {
                              return 1;
                         }
                         if (a.rating > b.rating) {
                              return -1;
                         }
                         return 0;
                    });
                    return {
                         ...state,
                         playersLoL: playersInLoL,
                         playersCSGO: playersInCSGO,
                         playersR6: playersInR6,
                    };
               }
               return {
                    ...state,
                    playersLoL: playersInLoL,
                    playersCSGO: playersInCSGO,
                    playersR6: playersInR6,
               };
          }

          default:
               return state;
     }
};

export default createReducer;
