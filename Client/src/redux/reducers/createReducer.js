import { CREATE_GAME } from '../constants';

const initialState = {
     games: null,
     playersLoL: [
          {
               name: 'Mischief Magma',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e1d4414e51aa14f1dc8460962e33791c3ad6e04e507749772f78d69f4acc_640.jpg',
               position: 'ADC',
               elo: 'Grand Master',
               rating: '2',
          },
          {
               name: 'Alley Ruffian',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e8d24b4257ac14f1dc8460962e33791c3ad6e04e507440752972d3924cc6_640.jpg',
               position: 'Jungle',
               elo: 'Iron',
               rating: '4',
          },
          {
               name: 'Major Paranoia',
               img: 'https://randomwordgenerator.com/img/picture-generator/man-1828202_640.jpg',
               position: 'Top',
               elo: 'Bronze',
               rating: '3',
          },
          {
               name: 'Aplomb Angel',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e7dc4b4251a914f1dc8460962e33791c3ad6e04e5074417c2f7dd6924dc6_640.png',
               position: 'Mid',
               elo: 'Bronze',
               rating: '1',
          },
          {
               name: 'Hydra Treat',
               img: 'https://randomwordgenerator.com/img/picture-generator/52e4d641495ba414f1dc8460962e33791c3ad6e04e507441722978d69f4ac2_640.jpg',
               position: 'Sup',
               elo: 'Silver',
               rating: '5',
          },
          {
               name: 'Gold Dahlia',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e8d2464f5bb10ff3d8992cc12c30771037dbf85254794075277ad6954b_640.jpg',
               position: 'ADC',
               elo: 'Silver',
               rating: '3',
          },
          {
               name: 'Mad Missiles',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e4dd44425bad14f1dc8460962e33791c3ad6e04e50744172287cd09245c7_640.jpg',
               position: 'Sup',
               elo: 'Diamond',
               rating: '2',
          },
          {
               name: 'Unstoppable Wet',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e1d54b4a54a514f1dc8460962e33791c3ad6e04e507441722973d4914bc5_640.jpg',
               position: 'Mid',
               elo: 'Gold',
               rating: '4',
          },
          {
               name: 'Diezel Hood',
               img: 'https://randomwordgenerator.com/img/picture-generator/54e1dd47434faa0df7c5d57bc32f3e7b1d3ac3e45659764c7c2672dd92_640.jpg',
               position: 'Top',
               elo: 'Platinum',
               rating: '5',
          },
          {
               name: 'Herp Raptor',
               img: 'https://randomwordgenerator.com/img/picture-generator/54e7d1434351aa14f1dc8460962e33791c3ad6e04e507440722d72d09045c5_640.jpg',
               position: 'Jungle',
               elo: 'Diamond',
               rating: '1',
          },
          {
               name: 'Oblivions Life',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e6dc414a54af14f1dc8460962e33791c3ad6e04e5074417c2f7cd3924fc7_640.jpg',
               position: 'ADC',
               elo: 'Master',
               rating: '2',
          },
          {
               name: 'Taiga Alien',
               img: 'https://randomwordgenerator.com/img/picture-generator/50e7d6464d53b10ff3d8992cc12c30771037dbf85254794074297edc974e_640.jpg',
               position: 'ADC',
               elo: 'Grand Master',
               rating: '5',
          },
          {
               name: 'Dragon Grey',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e6d6434c57b10ff3d8992cc12c30771037dbf85254784a722e73d6954d_640.jpg',
               position: 'Top',
               elo: 'Challenger',
               rating: '3',
          },
          {
               name: 'Amazement Axe',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e6dd464d50a414f1dc8460962e33791c3ad6e04e507749712a72dd9545c1_640.jpg',
               position: 'Jungle',
               elo: 'Gold',
               rating: '1',
          },
          {
               name: 'Legends Traverse',
               img: 'https://randomwordgenerator.com/img/picture-generator/53e0d4404c51af14f1dc8460962e33791c3ad6e04e50744172277fd09448c1_640.jpg',
               position: 'Sup',
               elo: 'Iron',
               rating: '4',
          },
     ],
     playersCSGO: [
          {
               name: 'Mischief Magma',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e1d4414e51aa14f1dc8460962e33791c3ad6e04e507749772f78d69f4acc_640.jpg',
               position: 'IGL',
               elo: 'Master Guardian Elite',
               rating: '2',
          },
          {
               name: 'Alley Ruffian',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e8d24b4257ac14f1dc8460962e33791c3ad6e04e507440752972d3924cc6_640.jpg',
               position: 'any',
               elo: 'Gold Nova II',
               rating: '4',
          },
          {
               name: 'Major Paranoia',
               img: 'https://randomwordgenerator.com/img/picture-generator/man-1828202_640.jpg',
               position: 'awper',
               elo: 'Supreme Master First Class',
               rating: '3',
          },
          {
               name: 'Aplomb Angel',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e7dc4b4251a914f1dc8460962e33791c3ad6e04e5074417c2f7dd6924dc6_640.png',
               position: 'awper',
               elo: 'Gold Nova III',
               rating: '1',
          },
          {
               name: 'Hydra Treat',
               img: 'https://randomwordgenerator.com/img/picture-generator/52e4d641495ba414f1dc8460962e33791c3ad6e04e507441722978d69f4ac2_640.jpg',
               position: 'support',
               elo: 'Global Elite',
               rating: '5',
          },
          {
               name: 'Gold Dahlia',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e8d2464f5bb10ff3d8992cc12c30771037dbf85254794075277ad6954b_640.jpg',
               position: 'second entry',
               elo: 'Silver III',
               rating: '3',
          },
          {
               name: 'Mad Missiles',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e4dd44425bad14f1dc8460962e33791c3ad6e04e50744172287cd09245c7_640.jpg',
               position: 'first entry',
               elo: 'Silver Elite',
               rating: '2',
          },
          {
               name: 'Unstoppable Wet',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e1d54b4a54a514f1dc8460962e33791c3ad6e04e507441722973d4914bc5_640.jpg',
               position: 'second awper',
               elo: 'Gold Nova Master',
               rating: '4',
          },
          {
               name: 'Diezel Hood',
               img: 'https://randomwordgenerator.com/img/picture-generator/54e1dd47434faa0df7c5d57bc32f3e7b1d3ac3e45659764c7c2672dd92_640.jpg',
               position: 'awper',
               elo: 'Master Guardian I',
               rating: '5',
          },
          {
               name: 'Herp Raptor',
               img: 'https://randomwordgenerator.com/img/picture-generator/54e7d1434351aa14f1dc8460962e33791c3ad6e04e507440722d72d09045c5_640.jpg',
               position: 'first entry',
               elo: 'Legendary Eagle Master',
               rating: '1',
          },
          {
               name: 'Oblivions Life',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e6dc414a54af14f1dc8460962e33791c3ad6e04e5074417c2f7cd3924fc7_640.jpg',
               position: 'IGL',
               elo: 'Legendary Eagle',
               rating: '2',
          },
          {
               name: 'Taiga Alien',
               img: 'https://randomwordgenerator.com/img/picture-generator/50e7d6464d53b10ff3d8992cc12c30771037dbf85254794074297edc974e_640.jpg',
               position: 'support',
               elo: 'Gold Nova I',
               rating: '5',
          },
          {
               name: 'Dragon Grey',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e6d6434c57b10ff3d8992cc12c30771037dbf85254784a722e73d6954d_640.jpg',
               position: 'any',
               elo: 'Silver IV',
               rating: '3',
          },
          {
               name: 'Amazement Axe',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e6dd464d50a414f1dc8460962e33791c3ad6e04e507749712a72dd9545c1_640.jpg',
               position: 'second entry',
               elo: 'Silver II',
               rating: '1',
          },
          {
               name: 'Legends Traverse',
               img: 'https://randomwordgenerator.com/img/picture-generator/53e0d4404c51af14f1dc8460962e33791c3ad6e04e50744172277fd09448c1_640.jpg',
               position: 'first entry',
               elo: 'Master Guardian II',
               rating: '4',
          },
     ],
     playersR6: [
          {
               name: 'Mischief',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e1d4414e51aa14f1dc8460962e33791c3ad6e04e507749772f78d69f4acc_640.jpg',
               elo: 'Gold III',
               rating: '2',
          },
          {
               name: 'Alley Ruffian',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e8d24b4257ac14f1dc8460962e33791c3ad6e04e507440752972d3924cc6_640.jpg',
               elo: 'Copper I',
               rating: '4',
          },
          {
               name: 'Major Paranoia',
               img: 'https://randomwordgenerator.com/img/picture-generator/man-1828202_640.jpg',
               elo: 'Bronze III',
               rating: '3',
          },
          {
               name: 'Aplomb Angel',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e7dc4b4251a914f1dc8460962e33791c3ad6e04e5074417c2f7dd6924dc6_640.png',
               elo: 'Silver IV',
               rating: '1',
          },
          {
               name: 'Hydra Treat',
               img: 'https://randomwordgenerator.com/img/picture-generator/52e4d641495ba414f1dc8460962e33791c3ad6e04e507441722978d69f4ac2_640.jpg',
               elo: 'Gold II',
               rating: '5',
          },
          {
               name: 'Gold Dahlia',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e8d2464f5bb10ff3d8992cc12c30771037dbf85254794075277ad6954b_640.jpg',
               elo: 'Platinum I',
               rating: '3',
          },
          {
               name: 'Mad Missiles',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e4dd44425bad14f1dc8460962e33791c3ad6e04e50744172287cd09245c7_640.jpg',
               elo: 'Copper V',
               rating: '2',
          },
          {
               name: 'Unstoppable Wet',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e1d54b4a54a514f1dc8460962e33791c3ad6e04e507441722973d4914bc5_640.jpg',
               elo: 'Copper II',
               rating: '4',
          },
          {
               name: 'Diezel Hood',
               img: 'https://randomwordgenerator.com/img/picture-generator/54e1dd47434faa0df7c5d57bc32f3e7b1d3ac3e45659764c7c2672dd92_640.jpg',
               elo: 'Copper III',
               rating: '5',
          },
          {
               name: 'Herp Raptor',
               img: 'https://randomwordgenerator.com/img/picture-generator/54e7d1434351aa14f1dc8460962e33791c3ad6e04e507440722d72d09045c5_640.jpg',
               elo: 'Silver V',
               rating: '1',
          },
          {
               name: 'Oblivions Life',
               img: 'https://randomwordgenerator.com/img/picture-generator/55e6dc414a54af14f1dc8460962e33791c3ad6e04e5074417c2f7cd3924fc7_640.jpg',
               elo: 'Silver II',
               rating: '2',
          },
          {
               name: 'Taiga Alien',
               img: 'https://randomwordgenerator.com/img/picture-generator/50e7d6464d53b10ff3d8992cc12c30771037dbf85254794074297edc974e_640.jpg',
               elo: 'Diamond',
               rating: '5',
          },
          {
               name: 'Dragon Grey',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e6d6434c57b10ff3d8992cc12c30771037dbf85254784a722e73d6954d_640.jpg',
               elo: 'Gold I',
               rating: '3',
          },
          {
               name: 'Amazement Axe',
               img: 'https://randomwordgenerator.com/img/picture-generator/57e6dd464d50a414f1dc8460962e33791c3ad6e04e507749712a72dd9545c1_640.jpg',
               elo: 'Bronze I',
               rating: '1',
          },
          {
               name: 'Legends Traverse',
               img: 'https://randomwordgenerator.com/img/picture-generator/53e0d4404c51af14f1dc8460962e33791c3ad6e04e50744172277fd09448c1_640.jpg',
               elo: 'Bronze IV',
               rating: '4',
          },
     ],
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
                         playersR6: playersInR6,
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

          case 'FILTER_BY_POSITION':
               let allPlayers = [state.playersLoL, state.playersCSGO, state.playersR6];
               allPlayers = allPlayers.flat();
               let playerPosition = state.allPlayers.filter((data) =>
                    data.position.map((data) => data.name).includes(payload)
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
               let playerEloLoL = state.playersLoL.filter((data) =>
                    data.elo.map((data) => data.name).includes(payload)
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
               let playerEloCSGO = state.playersCSGO.filter((data) =>
                    data.elo.map((data) => data.name).includes(payload)
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
               let playerEloR6 = state.playersR6.filter((data) =>
                    data.elo.map((data) => data.name).includes(payload)
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

          default:
               return state;
     }
};

export default createReducer;
