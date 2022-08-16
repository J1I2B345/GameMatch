import {
  CREATE_GAME,
  GET_USERNAME,
  UPDATE_USER,
  CREATE_NEWS,
  GET_ALL_NEWS,
  EDIT_PROFILE,
  LOGIN,
  REGISTER,
  USER,
  GET_GAME,
  GET_NEW,
  EDIT_NEWS,
} from "../actions";

const initialState = {
  games: null,
  user: null,
  userSelect: null,
  news: null,
  userProfile: null,
  aux: null,
  gameSelect: null,
  newSelect: null,
  game: null,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_GAME:
      console.log({ payload });
      return state;
    case CREATE_NEWS:
      return state;
    case GET_USERNAME:
      return { ...state, userSelect: action.payload };
    case GET_GAME:
      return { ...state, gameSelect: action.payload };
    case GET_NEW:
      return { ...state, newSelect: action.payload };

    case UPDATE_USER:
      return { ...state, user: payload };

    case GET_ALL_NEWS:
      return {
        ...state,
        news: [...action.payload],
      };
    case EDIT_PROFILE:
      return { ...state, userSelect: payload };
    case EDIT_NEWS:
      return { ...state, newSelect: payload };
    case LOGIN:
      return {
        ...state,
        user: payload,
        userProfile: payload,
      };
    case REGISTER:
      return { ...state };
    case USER:
      return {
        ...state,
        aux: payload,
      };

    default:
      return state;
  }
};
export default rootReducer;
