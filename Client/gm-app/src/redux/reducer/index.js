import {
  CREATE_GAME,
  GET_USERNAME,
  UPDATE_USER,
  CREATE_NEWS,
} from "../actions";

const initialState = {
  games: null,
  user: null,
  news: null,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_GAME:
      return { ...state, games: [...state.games, payload] };
    case GET_USERNAME:
      console.log({ e: action.payload });
      return { ...state, user: payload };

    case UPDATE_USER:
      return { ...state, user: payload };
    case CREATE_NEWS:
      return { ...state, news: [...state.news, payload] };

    default:
      return state;
  }
};
export default rootReducer;
