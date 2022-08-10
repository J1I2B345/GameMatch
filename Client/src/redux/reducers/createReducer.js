import { CREATE_GAME, GET_USERNAME } from '../constants';
import playersLoL from '../../data/usersLOL'
import playersCSGO from '../../data/usersCSGO'
import playersR6 from '../../data/usersR6'

const initialState = {
     games: null,
     playersLoL: playersLoL,
     playersCSGO: playersCSGO,
     playersR6: playersR6,
     username: null
};

const createReducer = (state = initialState, action) => {
     const { type, payload } = action;

     switch (type) {
          case CREATE_GAME:
               return state;

          // case 'GET_PLAYERS_LOL':
          //      return {
          //           ...state,
          //           playersLoL: payload,
          //      };
          // case 'GET_PLAYERS_CSGO':
          //      return {
          //           ...state,
          //           playersCSGO: payload,
          //      };
          // case 'GET_PLAYERS_R6':
          //      return {
          //           ...state,
          //           playersR6: payload,
          //      };

          case 'ORDER_BY_RATING': {
               let playersInLoL = initialState.playersLoL;
               let playersInCSGO = initialState.playersCSGO;
               let playersInR6 = initialState.playersR6;
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
                         playersR6: playersInR6,
                    };
               }
               else if (payload === 'Max-Min') {
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
               else return {
                    ...state,
                    playersLoL: playersInLoL,
                    playersCSGO: playersInCSGO,
                    playersR6: playersInR6,
               };
          }

          case 'FILTER_BY_POSITION':
               if (payload === 'All') return {
                    ...state,
                    playersLoL: playersLoL,
                    playersCSGO: playersCSGO,
                    playersR6: playersR6,
               }
               let allPlayers = [playersLoL, playersCSGO, playersR6];
               allPlayers = allPlayers.flat();
               let playerPosition = allPlayers.filter((player) =>

                    /// true 
                    player.position === payload
               );

               if (playerPosition.length > 0)
                    return {
                         ...state,
                         playersLoL: playerPosition,
                         playersCSGO: playerPosition,
                         playersR6: playerPosition,
                    };

               return {
                    ...state,
                    playersIsEmpty: 'There are no players whit this position',
               };

          case 'FILTER_BY_ELO_LOL':
               if (payload === 'All') return {
                    ...state,
                    playersLoL: playersLoL
               }
               let playerEloLoL = playersLoL.filter((player) =>
                    //true
                    player.elo === payload
               );
               if (playerEloLoL.length > 0)
                    return {
                         ...state,
                         playersLoL: playerEloLoL,
                    };
               return {
                    ...state,
                    playersIsEmpty: 'There are no players whit this elo',
               };

          case 'FILTER_BY_ELO_CSGO':
               if (payload === 'All') return {
                    ...state,
                    playersCSGO: playersCSGO
               }

               let playerEloCSGO = playersCSGO.filter((player) =>
                    //true
                    player.elo.toLowerCase() === payload.toLowerCase()
               );
               if (playerEloCSGO.length > 0)
                    return {
                         ...state,
                         playersCSGO: playerEloCSGO,
                    };
               return {
                    ...state,
                    playersIsEmpty: 'There are no players whit this elo',
               };

          case 'FILTER_BY_ELO_R6':
               if (payload === 'All') return {
                    ...state,
                    playersR6: playersR6
               }
          
               let playerEloR6 = playersR6.filter((player) =>
                    player.elo === payload
               );
               if (playerEloR6.length > 0)
                    return {
                         ...state,
                         playersR6: playerEloR6,
                    };
               return {
                    ...state,
                    playersIsEmpty: 'There are no players whit this elo',
               };

          case GET_USERNAME:
               return {...state,
               username: payload}
          default:
               return state;
     }
};

export default createReducer;
